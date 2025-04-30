"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown, X } from "lucide-react"
import * as React from "react"

export type OptionType = {
    value: string
    label: string
    icon?: React.ComponentType<{ className?: string }>
    disabled?: boolean
}

interface MultiSelectProps {
    options: OptionType[]
    onValueChange: (value: string[]) => void
    defaultValue?: string[]
    placeholder?: string
    disabled?: boolean
    variant?: "default" | "inverted"
    maxCount?: number
}

export function MultiSelect({
    options,
    onValueChange,
    defaultValue = [],
    placeholder = "Select options",
    disabled = false,
    variant = "default",
    maxCount,
}: MultiSelectProps) {
    const [open, setOpen] = React.useState(false)
    const [selected, setSelected] = React.useState<string[]>(defaultValue)

    React.useEffect(() => {
        setSelected(defaultValue)
    }, [defaultValue])

    const handleSelect = React.useCallback((value: string) => {
        let updatedSelected: string[]

        if (selected.includes(value)) {
            updatedSelected = selected.filter((item) => item !== value)
        } else {
            updatedSelected = [...selected, value]
        }

        setSelected(updatedSelected)
        onValueChange(updatedSelected)
    }, [onValueChange, selected])

    const handleRemove = React.useCallback((value: string) => {
        const updatedSelected = selected.filter((item) => item !== value)
        setSelected(updatedSelected)
        onValueChange(updatedSelected)
    }, [onValueChange, selected])

    const isInverted = variant === "inverted"
    const maxReached = maxCount ? selected.length >= maxCount : false

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={isInverted ? "outline" : "default"}
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                        "w-full justify-between",
                        isInverted ? "bg-slate-800 border-slate-700 hover:bg-slate-700 text-white" : "",
                        !selected.length && "text-muted-foreground"
                    )}
                    disabled={disabled}
                >
                    <div className="flex gap-1 flex-wrap">
                        {selected.length > 0 ? (
                            selected.length > (maxCount || 0) + 1 ? (
                                <>
                                    {options
                                        .filter((option) => selected.includes(option.value))
                                        .slice(0, maxCount)
                                        .map((option) => (
                                            <Badge
                                                key={option.value}
                                                variant={isInverted ? "outline" : "default"}
                                                className={cn(
                                                    "mr-1 mb-1",
                                                    isInverted
                                                        ? "bg-slate-700 hover:bg-slate-600 text-white"
                                                        : ""
                                                )}
                                            >
                                                {option.icon && (
                                                    <option.icon className="mr-1 h-3 w-3" />
                                                )}
                                                {option.label}
                                                <span
                                                    className="ml-1 rounded-full hover:bg-primary/20"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        handleRemove(option.value)
                                                    }}
                                                >
                                                    <X className="h-3 w-3" />
                                                </span>
                                            </Badge>
                                        ))}
                                    <Badge
                                        variant={isInverted ? "outline" : "default"}
                                        className={cn(
                                            "mr-1 mb-1",
                                            isInverted
                                                ? "bg-slate-700 hover:bg-slate-600 text-white"
                                                : ""
                                        )}
                                    >
                                        +{selected.length - (maxCount || 0)} more
                                    </Badge>
                                </>
                            ) : (
                                options
                                    .filter((option) => selected.includes(option.value))
                                    .map((option) => (
                                        <Badge
                                            key={option.value}
                                            variant={isInverted ? "outline" : "default"}
                                            className={cn(
                                                "mr-1 mb-1",
                                                isInverted
                                                    ? "bg-slate-700 hover:bg-slate-600 text-white"
                                                    : ""
                                            )}
                                        >
                                            {option.icon && (
                                                <option.icon className="mr-1 h-3 w-3" />
                                            )}
                                            {option.label}
                                            <span
                                                className="ml-1 rounded-full hover:bg-primary/20"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleRemove(option.value)
                                                }}
                                            >
                                                <X className="h-3 w-3" />
                                            </span>
                                        </Badge>
                                    ))
                            )
                        ) : (
                            placeholder
                        )}
                    </div>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className={cn(
                    "w-full p-0",
                    isInverted ? "bg-slate-800 border-slate-700 text-white" : ""
                )}
                style={{ width: "var(--radix-popover-trigger-width)" }}
            >
                <Command
                    className={isInverted ? "bg-slate-800 text-white" : ""}
                >
                    <CommandInput
                        placeholder="Search..."
                        className={isInverted ? "bg-slate-800 text-white border-slate-700" : ""}
                    />
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup className="max-h-60 overflow-y-auto">
                        {options.map((option) => (
                            <CommandItem
                                key={option.value}
                                value={option.value}
                                disabled={option.disabled || (maxReached && !selected.includes(option.value))}
                                onSelect={() => handleSelect(option.value)}
                                className={cn(
                                    "flex items-center gap-2",
                                    isInverted ? "aria-selected:bg-slate-700 text-white" : "",
                                    option.disabled || (maxReached && !selected.includes(option.value))
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                )}
                            >
                                <div
                                    className={cn(
                                        "border rounded-sm w-4 h-4 flex items-center justify-center",
                                        selected.includes(option.value)
                                            ? "bg-primary border-primary"
                                            : isInverted
                                                ? "border-slate-600"
                                                : ""
                                    )}
                                >
                                    {selected.includes(option.value) && (
                                        <Check className="h-3 w-3 text-white" />
                                    )}
                                </div>
                                {option.icon && (
                                    <option.icon className="h-4 w-4" />
                                )}
                                {option.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
} 