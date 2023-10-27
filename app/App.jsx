import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchResults from "./components/SearchResults";

export const BASE_URL = "http://localhost:9000";

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("all");

  useEffect(() => {
    const fetchFoodData = async () => {
      setLoading(true);

      try {
        const response = await fetch(BASE_URL);

        const json = await response.json();

        setData(json);
        setFilteredData(json);
        setLoading(false);
      } catch (error) {
        setError("Unable to Fetch Data");
      }
    };
    fetchFoodData();
  }, []);

  const SearchFood = (e) => {
    const searchValue = e.target.value;

    if (searchValue === "") {
      setFilteredData(null);
    }

    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filter);
  };

  const filterFood = (type)=>{
    if(type==="all"){
      setFilteredData(data);
      setSelectedBtn("all");
      return;
    }
    const filter = data?.filter((food) =>
    food.type.toLowerCase().includes(type.toLowerCase())
  );
  setFilteredData(filter);
  setSelectedBtn(type);

  }



  if (error) return <div>{error}</div>;
  if (loading) return <div>loading...</div>;

  return (
    <>
      <Container>
        <TopContainer>
          <div className="logo">
            <img src="/public/Foody Zone.png" alt="" />
          </div>
          <div className="search">
            <input onChange={SearchFood} type="text" placeholder="Search Food.." />
          </div>
        </TopContainer>
        <FilterContainer>
          <Button isSelectedBtn={selectedBtn==="all"} onClick={()=>filterFood("all")}>All</Button>
          <Button isSelectedBtn={selectedBtn==="breakfast"} onClick={()=>filterFood("breakfast")}>Breakfast</Button>
          <Button isSelectedBtn={selectedBtn==="lunch"} onClick={()=>filterFood("lunch")}>Lunch</Button>
          <Button isSelectedBtn={selectedBtn==="dinner"} onClick={()=>filterFood("dinner")}>Dinner</Button>
        </FilterContainer>
      </Container>
      ;
      <SearchResults data={filteredData} />
    </>
  );
};

export default App;

export const Container = styled.div`
  max-width: 75rem;
  margin: 0 auto;
`;
const TopContainer = styled.section`
  height: 8.75rem;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  align-items: center;

  .search {
    input {
      background: transparent;
      border: 0.0625rem solid red;
      color: white;
      border-radius: 0.3125rem;
      height: 2.5rem;
      font-size: 1rem;
      padding: 0 0.25rem;
    }
  }
  @media (0<width<600px) {
    flex-direction: column;
    height: 120px;
  }
`;
const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  padding-bottom: 1.875rem;
`;
export const Button = styled.button`
  background: ${({isSelected})=>(isSelected ? "#f22f2f":"#ff4343")};
  border-radius: 0.3125rem;
  padding: 0.375rem 0.75rem;
  border: none;
  color: white;
  cursor: pointer;
  &:hover{
    background-color: #f22f2f;
  }
`;
