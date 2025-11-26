"use client";
import { useCallback } from "react";

export const useModal = (ref) => {
    const show = useCallback(() => {
        if (ref.current && typeof window !== "undefined") {
            const { Modal } = require("bootstrap");
            Modal.getOrCreateInstance(ref.current).show();
        }
    }, [ref]);

    const hide = useCallback(() => {
        if (ref.current && typeof window !== "undefined") {
            const { Modal } = require("bootstrap");
            Modal.getInstance(ref.current)?.hide();
        }
    }, [ref]);

    const toggle = useCallback(() => {
        if (ref.current && typeof window !== "undefined") {
            const { Modal } = require("bootstrap");
            Modal.getOrCreateInstance(ref.current).toggle();
        }
    }, [ref]);

    return { show, hide, toggle };
};
