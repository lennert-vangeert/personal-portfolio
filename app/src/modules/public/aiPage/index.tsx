import Head from "@global/head";
import { useTranslate } from "@global/localization";
import { RootState } from "@global/store/store";
import { Textarea } from "@mantine/core";
import NeonTitle from "@common/neonText";
import { useCallback, useEffect, useRef, useState } from "react";
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
const SUGGESTION_KEYS = ["stack", "projects", "experience", "contact"] as const;

const AIPage = () => {
  const { mainMargin } = useSelector((state: RootState) => state.ui);
  const { t } = useTranslate();
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
  const [, setHistoryIndex] = useState<number | null>(null);
  const [chatReady, setChatReady] = useState<number>(0); // 0 = connecting, 1 = online, 2 = offline

  const sanitizeURL = useSanitizeURL();
  const logRef = useRef<HTMLDivElement | null>(null);

  // health check on mount
  useEffect(() => {
    const fetchCheck = async () => {
      try {
        const response: { status: string } = await fetch(
          `${import.meta.env.VITE_API_ORIGIN}/chat/test`
        );
        if (response.status === "ok") {
          setChatReady(1);
        } else {
          setChatReady(2);
          setError(t("aiPage.errors.serviceUnavailable"));
        }
      } catch {
        setChatReady(2);
        setError(t("aiPage.errors.serviceUnavailable"));
      }
    };
    fetchCheck();
  }, []);

  // persist conversation
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  // auto-scroll the log to the bottom on new content
  useEffect(() => {
    if (logRef.current) {
      requestAnimationFrame(() => {
        logRef.current!.scrollTop = logRef.current!.scrollHeight;
      });
    }
  }, [messages, loading]);

  const handleDeleteChat = useCallback(() => {
    setMessages([]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading || chatReady !== 1) return;

      setLoading(true);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          content: trimmed,
          sender: "user",
          timestamp: new Date(),
        },
      ]);
      setInputMessage("");
      setHistoryIndex(null);

      const response: AIResponse = await fetch(
        `${import.meta.env.VITE_API_ORIGIN}/chat`,
        "POST",
        undefined,
        JSON.stringify({ message: trimmed })
      );

      if (response.error) {
        setError(response.error);
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            content: String(response.error),
            sender: "bot",
            type: "error",
            timestamp: new Date(),
          },
        ]);
      } else {
        setError(null);
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            content: response.answer,
            sender: "bot",
            type: "normal",
            timestamp: new Date(),
          },
        ]);
      }
      setLoading(false);
    },
    [loading, chatReady]
  );

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
        }
        setInputMessage(userMessages[newIndex].content);
        return newIndex;
      });
    }
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputMessage);
    }
  };

  const statusKey =
    chatReady === 1 ? "online" : chatReady === 2 ? "offline" : "connecting";
  const composerDisabled = loading || chatReady !== 1;

  return (
    <>
      <Head
        title={t("aiPage.head.title")}
        description={t("aiPage.head.description")}
        keyWords={t("aiPage.head.keyWords")}
      />
      <div
        className={style.page}
        style={{ paddingLeft: mainMargin, paddingRight: mainMargin }}
      >
        <section className={style.window}>
          {/* ---- title bar ---- */}
          <header className={style.titlebar}>
            <div className={style.titleLeft}>
              <span className={style.windowDots} aria-hidden="true">
                <span className={style.dotMagenta} />
                <span className={style.dotYellow} />
                <span className={style.dotLime} />
              </span>
              <span className={style.titleName}>LENNERT.AI</span>
            </div>
            <div className={style.titleRight}>
              <span className={style.status} data-state={chatReady}>
                <span className={style.led} aria-hidden="true" />
                {t(`aiPage.status.${statusKey}`)}
              </span>
              <button
                type="button"
                className={style.clearBtn}
                onClick={handleDeleteChat}
                disabled={messages.length === 0}
                aria-label={t("aiPage.input.deleteAriaLabel")}
                title={t("aiPage.input.deleteTooltip")}
              >
                <IconTrash size={16} aria-hidden="true" />
              </button>
            </div>
          </header>

          {/* ---- conversation log ---- */}
          <div
            ref={logRef}
            className={style.log}
            role="log"
            aria-live="polite"
            aria-label={t("aiPage.messages.ariaLabel")}
          >
            {messages.length === 0 ? (
              <div className={style.empty}>
                <span className={style.boot}>
                  LENNERT.AI // READY{" "}
                  <span className={style.caret}>_</span>
                </span>
                <NeonTitle order={2} neon="cyan">
                  {t("aiPage.welcome.title")}
                </NeonTitle>
                <p className={style.bootText}>{t("aiPage.welcome.description")}</p>
                <div className={style.suggestions}>
                  <span className={style.suggestLabel}>
                    {t("aiPage.suggestions.title")}
                  </span>
                  {SUGGESTION_KEYS.map((key) => {
                    const question = t(`aiPage.suggestions.${key}`);
                    return (
                      <button
                        key={key}
                        type="button"
                        className={style.chip}
                        onClick={() => sendMessage(question)}
                        disabled={chatReady !== 1}
                      >
                        {question}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`${style.line} ${
                    message.type === "error"
                      ? style.errorLine
                      : message.sender === "user"
                      ? style.userLine
                      : style.botLine
                  }`}
                  role="article"
                  aria-label={`${
                    message.sender === "user"
                      ? t("aiPage.messages.userMessage")
                      : t("aiPage.messages.botMessage")
                  }, ${new Date(message.timestamp).toLocaleTimeString()}`}
                >
                  <span className={style.prefix}>
                    {message.sender === "user" ? "visitor>" : "LENNERT.AI>"}
                  </span>
                  {message.sender === "bot" && message.type !== "error" ? (
                    <div className={style.markdownContent}>
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <span className={style.msgText}>
                      {sanitizeURL(message.content)}
                    </span>
                  )}
                  <span className={style.timestamp}>
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))
            )}

            {loading && (
              <div
                className={`${style.line} ${style.botLine} ${style.typing}`}
                role="status"
                aria-live="polite"
                aria-label={t("aiPage.messages.loading")}
              >
                <span className={style.prefix}>LENNERT.AI&gt;</span>
                <span className={style.dots} aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
              </div>
            )}
          </div>

          {/* ---- composer ---- */}
          <form
            className={style.composer}
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(inputMessage);
            }}
          >
            <div className={style.composerRow}>
              <Textarea
                className={style.input}
                placeholder={t("aiPage.input.placeholder")}
                autosize
                minRows={1}
                maxRows={5}
                size="md"
                disabled={composerDisabled}
                value={inputMessage}
                onChange={(e) => {
                  setInputMessage(e.currentTarget.value);
                  setHistoryIndex(null);
                }}
                onKeyDown={handleKeyDown}
                aria-label={t("aiPage.input.ariaLabel")}
                aria-describedby="chat-disclaimer"
                styles={{
                  input: {
                    background: "rgba(5, 10, 18, 0.78)",
                    border: "1px solid rgba(5, 217, 232, 0.5)",
                    color: "var(--neon-text)",
                    caretColor: "var(--neon-cyan)",
                    fontFamily: '"Share Tech Mono", monospace',
                    borderRadius: "12px",
                  },
                }}
              />
              <button
                type="submit"
                className={style.sendBtn}
                disabled={composerDisabled || !inputMessage.trim()}
                aria-label={t("aiPage.input.sendAriaLabel")}
              >
                <IconArrowUp stroke={2.5} size={22} aria-hidden="true" />
              </button>
            </div>

            {chatReady === 2 && error && (
              <div className={style.errorStrip} role="alert">
                <IconExclamationCircle size={16} aria-hidden="true" />
                <span>{error}</span>
              </div>
            )}

            <p className={style.disclaimer} id="chat-disclaimer">
              {t("aiPage.disclaimer")}
            </p>
          </form>
        </section>
      </div>
    </>
  );
};

export default AIPage;
