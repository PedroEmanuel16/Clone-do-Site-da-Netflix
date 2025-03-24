import React from "react";

interface InputProps {
  id: string;
  type?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  label: string;
}

const Input = ({ id, type, value, onChange, label }: InputProps) => {
  return (
    <div className="relative">
      <input
        onChange={onChange}
        type={type}
        id={id}
        value={value}
        className="
            block
            rounded-md
            px-6
            pt-6
            pb-1
            w-full
            text-base
            text-white
            bg-neutral-700
            appearance-none
            italic
            focus:outline-none
            focus:ring-0
            peer
            "
        placeholder=" "
      />
      <label
        htmlFor={id}
        className="
            absolute
            text-base
            text-zinc-400
            duration-150
            tranform
            -translate-y-3
            scale-75
            top-4
            z-10
            origin-[0]
            left-6
            peer-placeholder-shown:scale-100
            peer-placeholder-shown:translate-y-0
            peer-focus:scale-75
            peer-focus:-translate-y-3
            "
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
