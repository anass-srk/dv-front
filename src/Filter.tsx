import filter_logo from "./assets/filter.svg";
import { Filter, SFilter } from "./utils";
import xmark from "./assets/xmark.svg";
import { useEffect, useRef, useState } from "react";

function Filter_({filters,onChange} : {filters: Filter[],onChange: (sfs: SFilter[]) => void}) {

  const selectedFilter = useRef<Filter>(filters[0]);
  const [selectedFilters,setSelectedFilters] = useState<SFilter[]>([])
  const [lv,setLv] = useState('')
  const [rv,setRv] = useState('')
  const [check,setCheck] = useState(0)

  function addFilter(_e: React.MouseEvent<HTMLButtonElement, MouseEvent>){
    if(lv.trim() != '' && selectedFilters.map(sf => sf.filter).indexOf(selectedFilter.current) == -1){
      if(rv.trim() != ''){
        setSelectedFilters([
          ...selectedFilters,
          {
            filter: selectedFilter.current,
            lv: lv,
            rv: rv
          },
        ]);
      }else{
        setSelectedFilters([
          ...selectedFilters,
          {
            filter: selectedFilter.current,
            lv: lv
          }
        ]);
      }
      setLv("");
      setRv("");
    }
  }

  useEffect(() => {
    onChange(selectedFilters)
  }, [selectedFilters]);

  return (
    <div className="dropdown">
      <button
        style={{ flexBasis: "50px" }}
        type="button"
        className="btn dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        data-bs-auto-close="outside"
      >
        <img src={filter_logo} alt="filter_logo" width={24} height={24} />
      </button>
      <div
        className="dropdown-menu p-1"
        id="filters-dropdown"
        style={{ minWidth: "300px" }}
      >
        <div className="container">
          <div className="row">
            <div className="col mt-2">Add filters</div>
            <div className="col">
              <button
                id="clear-all"
                className="btn"
                style={{ color: "blue", float: "inline-end" }}
              >
                clear all
              </button>
            </div>
          </div>
          <div className="row">
            <div className="input-group mb-3">
              <button
                type="button"
                className="btn btn-outline-secondary"
                id="filter-btn"
                onClick={addFilter}
              >
                Add filter
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="visually-hidden">Toggle Dropdown</span>
              </button>
              <ul className="dropdown-menu text-center" id="selected-filter">
                {filters.map((f, i) => (
                  <li key={i}>
                    <a
                      className="dropdown-item"
                      onClick={() => (selectedFilter.current = f)}
                    >
                      {f.field}
                    </a>
                  </li>
                ))}
                <div style={{ paddingTop: "5%" }}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={check}
                    onClick={() => {
                      setCheck(check == 0 ? 1 : 0)
                      setRv('')
                    }}
                    id="rangeSwitch"
                  />
                  <label className="form-check-label" htmlFor="rangeSwitch">
                    Range ?
                  </label>
                </div>
              </ul>
              <input type="text" className="form-control" id="filter-value" value={lv} onChange={(e) => setLv(e.target.value)}/>
              <input type={check == 0 ? 'hidden' : 'text'} className="form-control" id="filter-value2" value={rv} onChange={(e) => setRv(e.target.value)}/>
            </div>
          </div>
          {selectedFilters.map((sf, i) => (
            <div className="row" key={i}>
              <div className="col-auto mb-3">
                <button
                  type="button"
                  className="btn btn-dark"
                  style={{
                    display: "flex",
                    flexWrap: "nowrap",
                    alignItems: "center",
                    textWrap: "nowrap",
                  }}
                  onClick={() => {
                    setSelectedFilters(selectedFilters.filter(_sf => _sf.filter != sf.filter))
                  }}
                >
                  <p style={{ margin: "auto"}}>{sf.rv == null ? `${sf.filter.field}: ${sf.lv}` : `${sf.lv} <= ${sf.filter.field} <= ${sf.rv}`}</p>
                  <img
                    src={xmark}
                    alt="x"
                    width={16}
                    height={16}
                    className="white-svg"
                    style={{ marginLeft: "10px" }}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Filter_;
