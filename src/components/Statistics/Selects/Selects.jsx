import React, { useEffect, useState } from 'react';

import { CustomSelect } from 'components/CustomSelect/CustomSelect';
import { StyledSelectWrapper } from './Selects.styled';
import { getMonthAndYear } from 'services/getDateNow';

const months = [
  { value: 'January', label: 'January' },
  { value: 'February', label: 'February' },
  { value: 'March', label: 'March' },
  { value: 'April', label: 'April' },
  { value: 'May', label: 'May' },
  { value: 'June', label: 'June' },
  { value: 'July', label: 'July' },
  { value: 'August', label: 'August' },
  { value: 'September', label: 'September' },
  { value: 'October', label: 'October' },
  { value: 'November', label: 'November' },
  { value: 'December', label: 'December' },
];

const years = [
  // {
  //   value: '2023',
  //   label: '2023',
  // },
  // {
  //   value: '2022',
  //   label: '2022',
  // },
  // {
  //   value: '2021',
  //   label: '2021',
  // },
  // {
  //   value: '2020',
  //   label: '2020',
  // },
];

export const Selects = ({ onChange }) => {
  const [years, setYears] = useState([]);
  const [data, setDate] = useState(getMonthAndYear());
  const { month, year } = data;

  const monthObject = months[+month - 1];
  const yearObject = {
    value: year,
    label: year,
  };

  useEffect(() => {
    for (let i = year; i > 2021; i -= 1) {
      setYears(prev => [
        ...prev,
        {
          value: i,
          label: i,
        },
      ]);
    }
  }, []);
  console.log(years);

  const handleChangeMonth = month => {
    const dataMonth = new Date(`${month.value} 1`).getMonth() + 1;
    onChange({
      month: dataMonth,
    });
  };
  const handleChangeYear = year => {
    const dataYear = Number(year.value);
    onChange({
      year: dataYear,
    });
  };

  return (
    <StyledSelectWrapper>
      <CustomSelect
        defValue={monthObject}
        options={months}
        nameOfSelect={'month'}
        onChange={handleChangeMonth}
      />
      <CustomSelect
        defValue={yearObject}
        options={years}
        nameOfSelect={'year'}
        onChange={handleChangeYear}
      />
    </StyledSelectWrapper>
  );
};