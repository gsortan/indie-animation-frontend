"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";

type SortDropdownProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <button className="px-4 py-2 whitespace-nowrap w-38 h-10 rounded-md bg-gray-700 text-white hover:bg-gray-600 transition cursor-pointer">
          Sort: {value === "popularity" ? "Popularity" : "Alphabetical"}
        </button>
      </DropdownTrigger>

      <DropdownMenu
        aria-label="Sort Options"
        selectedKeys={[value]}
        onAction={(key) => onChange(key as string)}
      >
        <DropdownItem key="popularity">
          Popularity
        </DropdownItem>

        <DropdownItem key="alphabetical">
          Alphabetical
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}