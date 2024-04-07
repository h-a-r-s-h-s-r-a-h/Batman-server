import React, { useState, useEffect } from "react";

const Pagination = () => {
  const [allMedicine, setAllMedicine] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [medicinesPerPage] = useState(20);
  const [showAllPages, setShowAllPages] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchMedicineData();
  }, []);

  const fetchMedicineData = () => {
    setLoading(true);
    fetch("http://localhost:5000/api/allData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "MedicineData");
        setAllMedicine(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching medicine data:", error);
        setLoading(false);
      });
  };

  const indexOfLastMedicine = currentPage * medicinesPerPage;
  const indexOfFirstMedicine = indexOfLastMedicine - medicinesPerPage;
  const currentMedicines = allMedicine
    .filter((medicine) =>
      medicine.drugName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstMedicine, indexOfLastMedicine);

  const paginate = (pageNumber) => {
    if (
      pageNumber < 1 ||
      pageNumber > Math.ceil(allMedicine.length / medicinesPerPage)
    ) {
      return;
    }
    setCurrentPage(pageNumber);
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const handleShowAllPages = () => {
    setShowAllPages(!showAllPages);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const renderPageNumbers = () => {
    const totalPages = Math.ceil(allMedicine.length / medicinesPerPage);
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button key={i} onClick={() => paginate(i)}>
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div>
      <h1>Medicine Data</h1>
      <div>
        <input
          type="text"
          placeholder="Search by Drug Name"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      {loading ? (
        // <div>Loading...</div>
        <img src="/spinner1.svg" alt="Loading..." className="spinner-box" />
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>Drug Name</th>
                <th>Condition</th>
                <th>Rating</th>
                <th>Review</th>
              </tr>
            </thead>
            <tbody>
              {currentMedicines.map((medicine) => (
                <tr key={medicine.uniqueID}>
                  <td>{medicine.drugName}</td>
                  <td>{medicine.condition}</td>
                  <td>{medicine.rating}</td>
                  <td>{medicine.review}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <button onClick={goToFirstPage}>Go to First Page</button>
            <button onClick={() => paginate(currentPage - 1)}>
              Previous Page
            </button>
            {showAllPages ? (
              <button onClick={handleShowAllPages}>Show All Pages</button>
            ) : (
              <>
                {renderPageNumbers()}
                <button onClick={handleShowAllPages}>Show Less Pages</button>
              </>
            )}
            <button onClick={() => paginate(currentPage + 1)}>Next Page</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pagination;
