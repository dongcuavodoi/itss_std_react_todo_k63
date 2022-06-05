import React, { useState } from 'react';
/* 
  【inputコンポーネント】
　・新しいTodoを作成するINPUTフィールドを作成するコンポーネント
　・Enterをクリックされたら入力された文字を使って新しいTodoを作成する
*/
function Input({onEnterPress}) {
  const handleChange = (e) => {
    if (e.key === "Enter" && e.target.value) {
      onEnterPress(e.target.value)
      e.target.value = ""
    }
  }

  return (
    <div className="panel-block">
      <input type="text" className="input" placeholder="Todoを入力してください" onKeyDown={handleChange}/>
    </div>
  );
}

export default Input;
