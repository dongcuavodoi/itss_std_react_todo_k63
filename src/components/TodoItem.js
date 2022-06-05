/* 
  【TodoItemコンポーネント】
 ・Todoアイテムを表示する
 ・チェックボックスにチェックが入っているか管理する
 ・チェックボックスにチェックが入っているかアイテムをグレーアウトする
*/
function TodoItem({item, onClick}) {

  return (
    <label className="panel-block">
      <input type="checkbox" onChange={(e)=>onClick(item, e)} checked={item.done} />
      <span className={item.done ? "has-text-grey-light" : ""}>{item.text}</span>
    </label>
  );
}

export default TodoItem;