import { useState } from 'react';

/* 
  【Todoのデータ構成】
 ・key：Todoを特定するID（String）
 ・text：Todoの内容（String）
 ・done：完了状態（Boolean true:完了済み,, false:未完了）
*/

/* コンポーネント */
import TodoItem from './TodoItem';
import Input from './Input';
import Filter from './Filter';

/* カスタムフック */
import useStorage from '../hooks/storage';

/* ライブラリ */
import { getKey } from "../lib/util";

function Todo() {
  const [items, putItems, clearItems] = useStorage();
  const [filter, setFilter] = useState("all")

  const handleClick = (item) => {
    putItems(items.map(element => {
      return element.key === item.key ? { ...element, done: !element.done } : element
    }))
  }

  const handleEnterPress = (text) => {
    putItems([...items, { key: getKey(), text: text, done: false }])
  }

  const handleFilter = (filter) => {
    setFilter(filter)
  }

  const filterFunc = (element) => {
    if (filter === "all")
      return element
    if (filter === "incomplete" && !element.done)
      return element
    if (filter === "completed" && element.done)
      return element
  }

  const handleDelete = () => {
    clearItems()
  }

  return (
    <div className="panel">
      <div className="panel-heading">
        <span className="icon-text">
          <span className="icon">
            <i className="fas fa-calendar-check"></i>
          </span>
          <span> ITSS Todoアプリ</span>
        </span>
      </div>
      <div>
        <Input onEnterPress={handleEnterPress} />
      </div>
      <div>
        <Filter filter={filter} handleFilter={handleFilter} />
      </div>
      {items.filter(filterFunc).map(item => (
        <TodoItem key={item.key} item={item} onClick={handleClick} />
      ))}
      <div className="panel-block">
        {items.filter(filterFunc).length} items
      </div>
      <div className="panel-block">
        <button className="button is-fullwidth is-light" onClick={handleDelete}>
          全てのToDoを削除
        </button>
      </div>
    </div>
  );
}

export default Todo;