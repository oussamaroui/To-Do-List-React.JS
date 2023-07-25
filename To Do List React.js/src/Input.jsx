// import React, { useState } from 'react' ;

// export default function Input() {
//   let [items, setItem] = useState([]);
  
//   let addItem = () => {
//     let val = document.getElementById('inpField').value;
//      let newItem = {
//       id : Date.now(),
//       content : val,
//       editable : false
//      };
//     //############################################
//     // <span id='item'>
//     //   <div id='cp'>
//     //     <input type="checkbox" id='cb'/>
//     //     <p key={Date.now()} id='content'>{val}</p>
//     //   </div>
//     //   <div id='actions'>
//     //     <span onClick={btnEC} id='btnC'>Edit</span>
//     //     <span onClick={btnDC}>Delete</span>
//     //   </div>
//     // </span>;
//     //############################################
//     <span id='item'>
//       <div id='cp'>
//         <input type="checkbox" id='cb'/>
//         <p key={newItem.id} contenteditable={newItem.editable} id='content'>{newItem.content}</p>
//       </div>
//       <div id='actions'>
//         <span onClick={btnEC} id='btnC'>Edit</span>
//         <span onClick={btnDC}>Delete</span>
//       </div>
//     </span>;

//     setItem([...items, newItem]);
//     document.getElementById('inpField').value = ''
//   }

//   let btnEC = (itemID) =>{
//     if(itemID === newItem.id){
//       newItem.editable = !newItem.editable
//     }

//     let content = document.getElementById('content');
//     content.toggleAttribute('contenteditable')

//     let btnC = document.getElementById('btnC');
//     btnC.innerHTML = content.hasAttribute('contenteditable') ? 'Done' : 'Edit';
//     btnC.style.color = content.hasAttribute('contenteditable') ? 'green' : '#1b76ff';
//     content.style.outline = content.hasAttribute('contenteditable') ? '1px solid black' : 'none';
//     content.focus() ;
//   }


//   let btnDC = () =>{
//     console.log('no');
//   }

//   return (
//     <>
//       <div className="input">
//         <input type="text" id="inpField" placeholder="Enter item" />
//         <button onClick={addItem} id="addButton">Add</button>
//       </div>
//       <div>
//         <div id='itemList'>
//           {items}
//         </div>
//       </div>
//     </>
    
//   );
// }

// import React, { useState } from 'react';

// export default function Input() {
//   const [items, setItems] = useState([]);

//   const addItem = () => {
//     const val = document.getElementById('inpField').value;
//     const newItem = {
//       id: Date.now(),
//       content: val,
//       editable: false
//     };
//     setItems(prevItems => [...prevItems, newItem]);
//     document.getElementById('inpField').value = '';
//   };

//   const toggleEdit = (itemId) => {
//     setItems(prevItems => {
//       return prevItems.map(item => {
//         if (item.id === itemId) {
//           return {
//             ...item,
//             editable: !item.editable
//           };
//         }
//         return item;
//       });
//     });
//   };

//   const deleteItem = (itemId) => {
//     setItems(prevItems => prevItems.filter(item => item.id !== itemId));
//   };

//   return (
//     <>
//       <div className="input">
//         <input type="text" id="inpField" placeholder="Enter item" />
//         <button onClick={addItem} id="addButton">Add</button>
//       </div>
//       <div>
//         <div id='itemList'>
//           {items.map(item => (
//             <span key={item.id} id='item'>
//               <div id='cp'>
//                 <input type="checkbox" id='cb' />
//                 <p
//                   contentEditable={item.editable}
//                   style={{ outline: item.editable ? '1px solid black' : 'none' }}
//                 >
//                   {item.content}
//                 </p>
//               </div>
//               <div id='actions'>
//                 <span onClick={() => toggleEdit(item.id)} id='btnC'>
//                   {item.editable ? 'Done' : 'Edit'}
//                 </span>
//                 <span onClick={() => deleteItem(item.id)}>Delete</span>
//               </div>
//             </span>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

import React, { useRef, useState, useEffect } from 'react';

export default function Input() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  
  const addItem = () => {
    if (!inputValue) return;
    const newItem = {
      id: Date.now(),
      content: inputValue,
      editable: false
    };
    setItems(prevItems => [...prevItems, newItem]);
    setInputValue('');
  };

  const toggleEdit = (itemId) => {
    setItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === itemId) {
          return {
            ...item,
            editable: !item.editable, //l3ekss : kan false rdo true w l3ekss
          };
        }
        return item;
      });
    });
  };

  const deleteItem = (itemId) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const itmFocus = useRef(null);

  useEffect(() => {
    if (itmFocus.current) {
      const itemInEditMode = items.find(item => item.editable);
      if (itemInEditMode) {
        itmFocus.current.focus();
      }
    }
  }, [items]);

  const enterClick = e => { if(e.key === 'Enter') addItem() ; } 

  return (
    <>
      <h2>To Do List <img src="https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-1024.png"/></h2>
      <div className="input">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={enterClick}
          placeholder="What's on your mind"
          id="inpField"
        />
        <button onClick={addItem} id="addButton">Add</button>
      </div>
      <div>
        <div id='itemList'>
          {items.map(item => (
            <div key={item.id} id='item'>
              <div id='cp'>
                <input type="checkbox" id='cb' />
                <p
                  ref={itmFocus}
                  contentEditable={item.editable}
                  style={{ outline: item.editable ? '1px solid black' : 'none' }}
                >
                  {item.content}
                </p>
              </div>
              <div id='actions'>
                <span onClick={() => toggleEdit(item.id)} style={{ color: item.editable ? 'green' : '' }} id='btnC'>
                  {item.editable ? 'Done' : 'Edit'}
                </span>
                <span onClick={() => deleteItem(item.id)}>Delete</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
