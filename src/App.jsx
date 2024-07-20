import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let additionalCharacters = "";
    if (numberAllowed) {
      additionalCharacters += "0123456789";
      pass += "0"; // Ensure at least one number is included
    }
    if (charAllowed) {
      additionalCharacters += "!@#$%^&*-_+=[]{}~`";
      pass += "!"; // Ensure at least one special character is included
    }

    const remainingLength = length - pass.length;

    for (let i = 1; i <= remainingLength; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    for (let i = 1; i <= remainingLength; i++) {
      let char = Math.floor(Math.random() * additionalCharacters.length);
      pass += additionalCharacters.charAt(char);
    }

    pass = pass
      .split("")
      .sort(() => Math.random() - 0.5)
      .join(""); // Shuffle the password
    let trimmedString = pass.substring(0, length);
    setPassword(trimmedString);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);
  return (
    <>
    <div className="bg-gradient-to-b from-stone-950 via-stone-800 to-stone-700 max-h-screen">
      <div className="flex justify-center items-center h-screen">
    <div className="w-full max-w-3xl mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-zinc-950 text-orange-500">
      <h1 className="text-white text-center my-8 text-5xl font-bold font-mono uppercase">Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-6">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-3 px-5 text-3xl font-bold"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className="outline-none bg-gradient-to-r  from-blue-900 to-blue-500 text-3xl font-bold text-white px-5 py-5 shrink-0"
        >
          COPY
        </button>
      </div>
      <div className="flex text-2xl pl-16 font-bold gap-x-12 mb-4">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={18}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center  gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
    </div>
    </div>
    </>
  );
}

export default App;




