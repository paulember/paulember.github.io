import React, { useState, useEffect } from 'react';

// Define SeriesDataComponent as a functional component
const SeriesDataUtility = () => {
  // Define seriesData state using useState hook
  const [seriesData, setSeriesData] = useState({
    SeriesComplete: false,
    SeriesHomeRuns: null,
    SeriesTriples: null,
    SeriesDoubles: null,
    SeriesSingles: null,
    SeriesAtBats: null,
    SeriesRBI: null,
    SeriesGameCount: null,
    SeriesLastGame: null
  });

  // useEffect hook to update localStorage whenever seriesData changes
  useEffect(() => {
    localStorage.setItem("SeriesData", JSON.stringify(seriesData));
  }, [seriesData]);

  const updateSeries = (fieldName, value) => {
    setSeriesData(prevState => ({
      ...prevState,
      [fieldName]: value
    }));
  };

  const getSeriesData = (seriesData, fieldName) => {
    return seriesData[fieldName];
  };

  // Return the SeriesDataComponent
  return (
    // JSX markup for the component, if needed
    // This could include rendering the seriesData in some way
    <div>
      {/* Example: Display seriesData */}
      <pre>{JSON.stringify(seriesData, null, 2)}</pre>
    </div>
  );
};


export { SeriesDataUtility };

export const updateSeries = (setSeriesData, fieldName, value) => {
  setSeriesData(prevState => ({
    ...prevState,
    [fieldName]: value
  }));
};

export const getSeriesData = (seriesData, fieldName) => {
  return seriesData[fieldName];
};

