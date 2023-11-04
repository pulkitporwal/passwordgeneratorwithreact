import React, { useCallback, useEffect, useRef, useState } from "react";

const App = () => {
  const [length, setLength] = useState(9);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxy";

    if (numberAllowed) string += "0123456789";
    if (charAllowed) string += "!@#$%^&*()_+=-{}[]':;?/><.,~`";

    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * string.length + 1);

      pass += string.charAt(char);
      setPassword(pass);
      console.log(string);
    }
  }, [numberAllowed, charAllowed, length]);

  useEffect(() => {
    passwordGenerator();
  }, [length, charAllowed, numberAllowed, passwordGenerator]);

  const inputReference = useRef();

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div className="flex justify-start flex-col w-[50vw] pt-5 items-center bg-[#0e0e0e] rounded-xl text-white h-[250px]">
        <h1 className="text-2xl font-mono font-bold">Password Generator</h1>
        <div className="mt-10 mb-10">
          <input
            className="w-[400px] py-1 text-black pl-4"
            type="text"
            readOnly
            value={password}
            ref={inputReference}
          />
          <button 
          className="bg-blue-500 py-1 px-2"
          onClick={()=>{
            inputReference.current.select();
            window.navigator.clipboard.writeText(password)
          }}
          >copy</button>
        </div>
        <div className="flex gap-6">
          <p>
            <input
              type="range"
              min={5}
              max={20}
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />{" "}
            Length : {length}
          </p>
          <p className="flex gap-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />{" "}
            Numbers
          </p>
          <p className="flex gap-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />{" "}
            Characters
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
