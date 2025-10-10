import Head from "@global/head";
import { RootState } from "@global/store/store";
import {
  Alert,
  Box,
  Center,
  Loader,
  Skeleton,
  Stack,
  Text,
  Textarea,
  Title,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  IconArrowUp,
  IconExclamationCircle,
  IconTrash,
} from "@tabler/icons-react";
import { fetch } from "@global/utils/fetcher";
import useSanitizeURL from "@common/utils/sanitizeUrl";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import style from "./aiPage.module.css";

type Message = {
  id: string;
  content: string;
  sender: "user" | "bot";
  type?: "normal" | "error";
  timestamp: Date;
};

type AIResponse = {
  answer: string;
  chunksUsed: string[];
  error: string | null;
};

const LOCAL_STORAGE_KEY = "chat-messages";

const AIPage = () => {
  const { mainMargin, isMobile } = useSelector((state: RootState) => state.ui);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored) as Message[];
      } catch {
        return [];
      }
    }
    return [];
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [__, setHistoryIndex] = useState<number | null>(null);
  const [chatReady, setChatReady] = useState<number>(0); // 0 = not ready, 1 = ready, 2 = error

  const theme = useMantineTheme();
  const sanitizeURL = useSanitizeURL();

  // ref for the scrollable messages container
  const messagesRef = useRef<HTMLDivElement | null>(null);

  // ref for the fixed form so we can measure its height and add sufficient bottom padding
  const formRef = useRef<HTMLFormElement | null>(null);
  const [bottomPaddingPx, setBottomPaddingPx] = useState<number>(160); // fallback

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        const parsed: Message[] = JSON.parse(stored);
        setMessages(parsed);
      } catch {}
    }
    const fetchCheck = async () => {
      try {
        const response: { status: string } = await fetch(
          `${import.meta.env.VITE_API_ORIGIN}/chat/test`
        );
        if (response.status === "ok") {
          setChatReady(1);
        } else {
          setChatReady(2);
          setError("Chat service is not available");
        }
      } catch {
        setChatReady(2);
        setError("Chat service is not available");
      }
    };

    fetchCheck();
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  // measure the fixed form height and set padding for the messages container
  useEffect(() => {
    const measure = () => {
      if (formRef.current) {
        const rect = formRef.current.getBoundingClientRect();
        // add a little extra spacing so messages don't butt up exactly to the form
        setBottomPaddingPx(Math.ceil(rect.height + 24));
      } else {
        // fallback (keeps previous if available)
        setBottomPaddingPx((prev) => prev || 160);
      }
    };

    // measure initially and on resize (responsive)
    measure();
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
    };
  }, [isMobile, mainMargin]);

  // auto-scroll to bottom whenever messages change or bottom padding changes
  useEffect(() => {
    if (messagesRef.current) {
      // ensure layout is stable before scrolling (small delay)
      // using requestAnimationFrame is usually enough
      requestAnimationFrame(() => {
        messagesRef.current!.scrollTop = messagesRef.current!.scrollHeight;
      });
    }
  }, [messages, loading, bottomPaddingPx]);

  const handleDeleteChat = useCallback(() => {
    setMessages([]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }, []);

  const handleSend = useCallback(async () => {
    setLoading(true);
    if (inputMessage.trim()) {
      const nowId = Date.now().toString();
      const newMessage: Message = {
        id: nowId,
        content: inputMessage,
        sender: "user",
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputMessage("");
      setHistoryIndex(null);

      // demo bot reply. keep this behaviour while testing.
      // setMessages((prevMessages) => [
      //   ...prevMessages,
      //   {
      //     id: (Date.now() + 1).toString(),
      //     content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
      //     sender: "bot",
      //     timestamp: new Date(),
      //   },
      // ]);
      const response: AIResponse = await fetch(
        `${import.meta.env.VITE_API_ORIGIN}/chat`,
        "POST",
        undefined,
        JSON.stringify({ message: inputMessage })
      );

      if (response.error) {
        setError(response.error);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: Date.now().toString(),
            content: String(response.error),
            sender: "bot",
            type: "error",
            timestamp: new Date(),
          },
        ]);
      } else {
        setError(null);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: Date.now().toString(),
            content: response.answer,
            sender: "bot",
            type: "normal",
            timestamp: new Date(),
          },
        ]);
      }
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [inputMessage]);

  const userMessages = messages.filter((m) => m.sender === "user");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (userMessages.length === 0) return;

      setHistoryIndex((prev) => {
        const newIndex =
          prev === null ? userMessages.length - 1 : Math.max(prev - 1, 0);
        setInputMessage(userMessages[newIndex].content);
        return newIndex;
      });
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (userMessages.length === 0) return;

      setHistoryIndex((prev) => {
        if (prev === null) return null;
        const newIndex = prev + 1;

        if (newIndex >= userMessages.length) {
          setInputMessage("");
          return null;
        } else {
          setInputMessage(userMessages[newIndex].content);
          return newIndex;
        }
      });
    }
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const inputIcon = useMemo(() => {
    if (inputMessage.length > 0) {
      return (
        <Center
          bg={theme.colors.default[5]}
          p=".25rem"
          style={{ borderRadius: "50%" }}
        >
          <IconArrowUp
            stroke={2}
            color="white"
            onClick={handleSend}
            size={32}
            style={{ cursor: "pointer" }}
          />
        </Center>
      );
    } else if (chatReady === 0) {
      return (
        <Center
          bg={theme.colors.default[5]}
          p=".25rem"
          style={{ borderRadius: "50%" }}
        >
          <Loader color="#fff" />
        </Center>
      );
    } else if (chatReady === 2) {
      return (
        <Center
          bg={theme.colors.default[5]}
          p=".25rem"
          style={{ borderRadius: "50%", cursor: "not-allowed" }}
        >
          <IconExclamationCircle stroke={2} color="white" size={32} />
        </Center>
      );
    }
  }, [chatReady, inputMessage]);

  const messagesJustify = useMemo(
    () => (messages.length === 0 ? "space-between" : "flex-end"),
    [messages.length]
  );

  return (
    <>
      <Head
        title="Ask me a question"
        description="This is the chat page"
        keyWords="chat, AI, assistant, LennertAI"
      />
      {/* outer container takes full viewport and hides body scroll */}
      <Box
        className={style.outerContainer}
        style={{
          height: "70vh",
          overflow: "hidden",
          paddingLeft: mainMargin,
          paddingRight: mainMargin,
        }}
      >
        {/* main vertical stack that fills the container */}
        <Stack
          style={{
            height: "100%", // changed from 100vh to 100% so it fits within the outer container
            paddingTop: "5rem",
            paddingBottom: 0,
            display: "flex",
          }}
        >
          {/* scrollable messages area - only this div will scroll */}
          <Box
            ref={messagesRef}
            style={{
              flex: 1,
              overflowY: "auto",
              WebkitOverflowScrolling: "touch",
              paddingBottom: `${bottomPaddingPx}px`,
            }}
          >
            <Stack justify={messagesJustify} mx=".75rem">
              {messages.length === 0 && (
                <Center>
                  <Stack ta="center">
                    <Title order={2}>Meet my AI Assistant</Title>
                    <Text size={theme.headings.sizes.h4.fontSize}>
                      You can ask this assistant anything about me or my
                      portfolio.
                    </Text>
                  </Stack>
                </Center>
              )}
              {messages.map((message) => (
                <Box
                  key={message.id}
                  bg={
                    message.type === "error"
                      ? "#ea2112ff" // red for error
                      : message.sender === "user"
                      ? theme.colors.default[5]
                      : "lightgray"
                  }
                  c={
                    message.type === "error"
                      ? "#fff"
                      : message.sender === "user"
                      ? "#fff"
                      : "#000"
                  }
                  style={{
                    alignSelf:
                      message.sender === "user" ? "flex-end" : "flex-start",
                    borderRadius: "8px",
                    padding: "0.5rem 1rem",
                    width: "fit-content",
                    maxWidth: isMobile ? "85%" : "60%",
                  }}
                  className={
                    message.sender === "user"
                      ? style.rightMessage
                      : style.leftMessage
                  }
                >
                  {message.sender === "bot" && message.type !== "error" ? (
                    <div className={style.markdownContent}>
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    sanitizeURL(message.content)
                  )}
                  <Text
                    size="xs"
                    c={
                      message.type === "error"
                        ? "#fff"
                        : message.sender === "user"
                        ? "#fff"
                        : "dimmed"
                    }
                    ta={message.sender === "user" ? "left" : "right"}
                  >
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </Text>
                </Box>
              ))}

              {loading && (
                <Box
                  bg="gray"
                  style={{
                    alignSelf: "flex-start",
                    borderRadius: "8px",
                    padding: "0.5rem 1rem",
                    width: "fit-content",
                  }}
                >
                  <Stack>
                    <Skeleton height=".5rem" w="8rem" />
                    <Skeleton height=".5rem" w="6rem" />
                    <Skeleton height=".5rem" w="7rem" />
                  </Stack>
                </Box>
              )}
            </Stack>
          </Box>

          {/* fixed form stays above the scrollable area */}
          <Stack align="center">
            <form
              ref={formRef}
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              style={{
                position: "fixed",
                bottom: "2.5rem",
                left: "50%",
                transform: "translateX(-50%)",
                width: "100%",
                maxWidth: "600px",
                paddingLeft: isMobile ? mainMargin : 0,
                paddingRight: isMobile ? mainMargin : 0,
                zIndex: 999, // ensure overlay is on top
              }}
            >
              {error && (
                <Alert
                  variant="outline"
                  mx="auto"
                  title="Error"
                  color="red"
                  mb="1rem"
                  maw="20rem"
                  icon={<IconExclamationCircle size={16} />}
                  bg={theme.white}
                >
                  {error}
                </Alert>
              )}
              <Textarea
                bg="white"
                placeholder="Your question..."
                autosize
                minRows={1}
                maxRows={5}
                styles={{
                  input: {
                    borderRadius: "50px",
                    paddingRight: "4rem",
                  },
                }}
                size="xl"
                disabled={loading || chatReady !== 1}
                mx="auto"
                maw={600}
                miw={isMobile ? "300px" : "600px"}
                onChange={(e) => {
                  setInputMessage(e.currentTarget.value);
                  setHistoryIndex(null);
                }}
                onKeyDown={handleKeyDown}
                rightSection={inputIcon}
                leftSection={
                  <Tooltip label="Delete chat" withArrow>
                    <IconTrash
                      stroke={2}
                      color="white"
                      onClick={handleDeleteChat}
                      size={32}
                      style={{ cursor: "pointer" }}
                    />
                  </Tooltip>
                }
                value={inputMessage}
              />
              <Text mt=".5rem" ta="center" size="sm" c="dimmed">
                This AI can make mistakes, please verify the information it
                provides.
              </Text>
            </form>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default AIPage;
