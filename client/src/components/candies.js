import React, { useState, useEffect } from "react"
import axios from 'axios'

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [candyMakers, setCandyMakers] = useState([])
    const [filteredCandyMakers, setFilteredCandyMakers] = useState([])

    useEffect(() => {
      fetchCandyMakers()
    },[])

    useEffect(() => {
      setFilteredCandyMakers(candyMakers.filter(maker => maker.name.toLowerCase().includes(searchTerm.toLowerCase()) || maker.country.toLowerCase().includes(searchTerm.toLowerCase())))
    },[searchTerm])


    const fetchCandyMakers = async () => {
      let {data} = await axios.get("http://localhost:1337/api/manufacturers")
      setCandyMakers(data)
      setFilteredCandyMakers(data)
      
    }

    return (
        <div className="content">
            <div className="title">Candy Makers</div>
            <input className="searchBox" type="text" name="search" value={searchTerm} onChange={event => setSearchTerm(event.target.value)} />
            <div className="searchTerm">{searchTerm}</div>

            {filteredCandyMakers.map(maker => {
              return (
                <div>{`${maker.name} (${maker.country})`}</div>
              )
            })}
        </div>
    )
}

export default Search
