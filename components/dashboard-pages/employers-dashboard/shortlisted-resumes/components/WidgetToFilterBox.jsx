const WidgetToFilterBox = ({ search, onChangeSearch, size, sizeHandler }) => {
  return (
    <div className="chosen-outer">
      {/* <!--search box--> */}
      <div className="search-box-one">
        <form method="post" action="blog.html">
          <div className="form-group">
            <span className="icon flaticon-search-1"></span>
            <input
              value={search}
              type="search"
              name="search-field"
              onChange={onChangeSearch}
              placeholder="Search"
              required
            />
          </div>
        </form>
      </div>
      {/* End searchBox one */}

      {/* <!--Tabs Box--> */}
      <select
        onChange={sizeHandler}
        className="chosen-single form-select ms-3 "
        value={size || 10}
      >
        <option value={10}>10 per page</option>
        <option value={25}>25 per page</option>
        <option value={50}>50 per page</option>
      </select>
    </div>
  );
};

export default WidgetToFilterBox;
