import React, { useState, useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';

interface EditableTextProps {
    value: string;
    onChange: (value: string) => void;
    className?: string;
    multiline?: boolean;
    tagName?: React.ElementType;
}

export const EditableText: React.FC<EditableTextProps> = ({
    value,
    onChange,
    className,
    multiline = false,
    tagName: Tag = 'div'
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [localValue, setLocalValue] = useState(value);
    const inputRef = useRef<HTMLElement>(null);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleBlur = () => {
        setIsEditing(false);
        if (localValue !== value) {
            onChange(localValue);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !multiline) {
            e.preventDefault();
            inputRef.current?.blur();
        }
    };

    if (isEditing) {
        if (multiline) {
            return (
                <textarea
                    ref={inputRef as any}
                    value={localValue}
                    onChange={(e) => setLocalValue(e.target.value)}
                    onBlur={handleBlur}
                    className={cn("w-full bg-transparent border-2 border-blue-400 rounded p-1 outline-none resize-none", className)}
                    rows={3}
                    autoFocus
                />
            );
        }
        return (
            <input
                ref={inputRef as any}
                value={localValue}
                onChange={(e) => setLocalValue(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className={cn("w-full bg-transparent border-2 border-blue-400 rounded px-1 outline-none", className)}
                autoFocus
            />
        );
    }

    return (
        <Tag
            onClick={() => setIsEditing(true)}
            className={cn("cursor-text hover:bg-blue-50/50 hover:ring-2 hover:ring-blue-100 rounded px-1 -mx-1 transition-all duration-200", className)}
        >
            {value}
        </Tag>
    );
};
