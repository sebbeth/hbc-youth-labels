import { loadMessageFromStorage, saveMessage, clearMessage } from "../helpers/Label.helpers";
import React from 'react';

const defaultMessage: string = "But you can call me...";
const maxCharaters = 34;

export function useMessage() {
    const storedMessage = loadMessageFromStorage();
    const [message, setMessage] = React.useState<string>(storedMessage ? storedMessage : defaultMessage);
    function updateMessage(input: string | null) {
        if (input === null) {
            clearMessage();
            setMessage(defaultMessage);
        } else {
            if (input.length <= maxCharaters) {
                saveMessage(input);
                setMessage(input);
            }
        }
    }
    return { message, updateMessage };
}