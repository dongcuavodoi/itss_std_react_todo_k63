/* 
  【Filterコンポーネント】
 ・該当するTodoをステータス毎にで分けてリスト表示する
 ・タブで表示する
 ・サポートするステータスは「すべて」「未完了」「完了済み」
*/
function Filter({ filter, handleFilter }) {

  const handleClick = (filter, e) => {
    e.preventDefault()
    handleFilter(filter)
  }

  return (
    <div className="panel-tabs">
      <a href="/#"
        className={filter === "all" ? "is-active" : ""}
        onClick={(e) => { handleClick("all", e) }}>全て</a>
      <a href="/#"
        className={filter === "incomplete" ? "is-active" : ""}
        onClick={(e) => { handleClick("incomplete", e) }}>未完了</a>
      <a href="/#"
        className={filter === "completed" ? "is-active" : ""}
        onClick={(e) => { handleClick("completed", e) }}>完了済み</a>
    </div>
  );
}

export default Filter