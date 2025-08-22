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
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  IconArrowUp,
  IconExclamationCircle,
  IconTrash,
} from "@tabler/icons-react";
import { fetch } from "@global/utils/fetcher";
import useSanitizeURL from "@common/utils/sanitizeUrl";
import styler from "./ChatPage.module.css";

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

const ChatPage = () => {
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

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        const parsed: Message[] = JSON.parse(stored);
        setMessages(parsed);
      } catch {
      }
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

  const handleDeleteChat = useCallback(() => {
    setMessages([]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }, []);

  const handleSend = useCallback(async () => {
    setLoading(true);
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        content: inputMessage,
        sender: "user",
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputMessage("");
      setHistoryIndex(null);

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
          style={{ borderRadius: "50%" }}
        >
          <IconExclamationCircle
            stroke={2}
            color="white"
            size={32}
            style={{ cursor: "pointer" }}
          />
        </Center>
      );
    }
  }, [chatReady, inputMessage]);

  return (
    <>
      <Head title="Ask me a question" description="This is the chat page" />
      <Stack
        mt="2.5rem"
        pt="5rem"
        pb="10rem"
        px={mainMargin}
        justify={messages.length === 0 ? "space-between" : "flex-end"}
        mih="90vh"
      >
        <Stack>

          {
            messages.length === 0 && (
              <Center>
                <Stack ta="center">
                  <Title order={2}>Meet my AI Assistant</Title>
                  <Text size={theme.headings.sizes.h4.fontSize}>You can ask this assistant anything about me or my portfolio.</Text>
                </Stack>
              </Center>
            )
          }
          {messages.map((message) => (
            <Box
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
                maxWidth: "60%",
              }}
              className={
                message.sender === "user"
                  ? styler.rightMessage
                  : styler.leftMessage
              }
            >
              {sanitizeURL(message.content)}
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
        <Stack align="center">
          {error && (
            <Alert title="Error" color="red">
              {error}
            </Alert>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <Textarea
              pos="fixed"
              bottom="2.5rem"
              left="50%"
              placeholder="Your question..."
              autosize
              minRows={1}
              maxRows={5}
              styles={{
                root: {
                  transform: "translateX(-50%)",
                },
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
          </form>
        </Stack>
      </Stack>
    </>
  );
};

export default ChatPage;
