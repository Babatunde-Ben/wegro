interface InputProps {
  type: string;
  value: string;
  name: string;
  id?: string;
  className?: string;
  label?: string;
  placeholder?: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  type,
  id,

  label,
  name,
  value,
  placeholder,
  handleInputChange,
}: InputProps) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <label className="text-sm font-medium" htmlFor={id}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={handleInputChange}
        className={` w-full text-sm p-3.5 py-3 rounded-md outline-none border border-primary-100 bg-white bg-transparent  focus:border-slate-600`}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
