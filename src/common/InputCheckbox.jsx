export function InputCheckbox({ id, onCheck, isChecked }) {
  const handleCheckbox = (id) => {
    onCheck(id, !isChecked);
  };
  return (
    <div className="flex items-center size-full">
      <label htmlFor={id} className="flex items-center cursor-pointer relative">
        <input
          type="checkbox"
          className="peer h-5 w-5 cursor-pointer transition-all appearance-none shadow hover:shadow-md border-2 border-checkbox-border"
          id={id}
          checked={isChecked}
          onChange={() => handleCheckbox(id)}
        />
        <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            width="15"
            height="11"
            viewBox="0 0 15 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.5 6C2.9241 7.72038 4.2097 8.95413 5.83333 11.5C8.25195 5.40413 10.6869 3.09455 16.5 0.5"
              stroke="#FF7F40"
            />
          </svg>
        </span>
      </label>
    </div>
  );
}

export default InputCheckbox;
