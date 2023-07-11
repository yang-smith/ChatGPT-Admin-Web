import { BotType } from "./model";
import { ChatCompletionResponseMessage } from "openai";
export declare namespace StoreType {
    type Model = "gpt-3.5-turbo" | "gpt-4" | "newbing";
    enum SubmitKey {
        Enter = "Enter",
        CtrlEnter = "Ctrl + Enter",
        ShiftEnter = "Shift + Enter",
        AltEnter = "Alt + Enter",
        MetaEnter = "Meta + Enter"
    }
    enum Theme {
        Auto = "auto",
        Dark = "dark",
        Light = "light"
    }
    interface ChatConfig {
        maxToken?: number;
        historyMessageCount: number;
        compressMessageLengthThreshold: number;
        sendBotMessages: boolean;
        submitKey: SubmitKey;
        avatar: string;
        theme: Theme;
        tightBorder: boolean;
        modelConfig: {
            model: BotType.Model;
            temperature: number;
            max_tokens: number;
            presence_penalty: number;
        };
    }
    interface SettingStore {
        config: ChatConfig;
        getConfig: () => ChatConfig;
        resetConfig: () => void;
        updateConfig: (updater: (config: ChatConfig) => void) => void;
    }
    type Message = ChatCompletionResponseMessage & {
        date: string;
        streaming?: boolean;
        model?: Model;
    };
    type ModelConfig = ChatConfig["modelConfig"];
    interface ChatStat {
        tokenCount: number;
        wordCount: number;
        charCount: number;
    }
    interface ChatSession {
        id: number;
        topic: string;
        memoryPrompt: string;
        messages: Message[];
        stat: ChatStat;
        lastUpdate: string;
        lastSummarizeIndex: number;
    }
    /**
     * Store - For chat history
     */
    interface ChatStore {
        showSideBar: boolean;
        setShowSideBar: (open: boolean) => void;
        sessions: ChatSession[];
        currentSessionIndex: number;
        removeSession: (index: number) => void;
        selectSession: (index: number) => void;
        newSession: () => void;
        currentSession: () => ChatSession;
        onNewMessage: (message: Message) => void;
        onUserInput: (content: string) => Promise<void>;
        summarizeSession: () => void;
        updateStat: (message: Message) => void;
        updateCurrentSession: (updater: (session: ChatSession) => void) => void;
        updateMessage: (sessionIndex: number, messageIndex: number, updater: (message?: Message) => void) => void;
        getMessagesWithMemory: () => Message[];
        getMemoryPrompt: () => Message;
        clearAllData: () => void;
    }
}
//# sourceMappingURL=store.d.ts.map