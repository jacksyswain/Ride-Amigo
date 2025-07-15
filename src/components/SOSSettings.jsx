import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addNumber, removeNumber } from '../features/sos/sosSlice';

export default function SOSSettings() {
  const numbers = useSelector((state) => state.sos.numbers);
  const dispatch = useDispatch();
  const [input, setInput] = useState('');

  const handleAdd = () => {
    const phone = input.trim();
    if (phone && /^\d{10,13}$/.test(phone)) {
      dispatch(addNumber(phone));
      setInput('');
    } else {
      alert("Enter valid WhatsApp number (10–13 digits)");
    }
  };

  const handleRemove = (index) => {
    dispatch(removeNumber(index));
  };

  // ❌ If already numbers exist, hide input
  if (numbers.length > 0) {
    return (
      <div>
        <h2>✅ SOS WhatsApp Numbers Already Set</h2>
        <ul>
          {numbers.map((num, i) => (
            <li key={i}>
              {num}
              <button onClick={() => handleRemove(i)} style={{ marginLeft: '1em' }}>
                ❌ Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // 📝 Show input form only if no numbers saved
  return (
    <div>
      <h2>📱 Set SOS WhatsApp Number</h2>
      <input
        type="text"
        value={input}
        placeholder="Enter WhatsApp number"
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}