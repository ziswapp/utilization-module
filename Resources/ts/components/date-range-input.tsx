import { DatePickerField } from "@ziswapp/components/date-picker-field";
import { useDateRangePickerInput } from "@ziswapp/hooks";
import dayjs from "@ziswapp/utils/datetime";
import { useState } from "react";

export interface DateRangeInputProps {
  onFilter: (value: string) => void;
}

export const DateRangeInput = (props: DateRangeInputProps) => {
  const [filterStartDate, fliterEndDate] = useDateRangePickerInput({
    key: "use_at"
  });
  const [dateRange, setDateRange] = useState([filterStartDate || null, fliterEndDate || null]);
  const [startDate, endDate] = dateRange;

  return (
    <DatePickerField
      isClearable
      selectsRange
      popperProps={{
        strategy: "fixed",
        positionFixed: true
      }}
      placeholderText="Tanggal penggunaan disini"
      dateFormat="dd MMM yyyy"
      selected={startDate}
      startDate={startDate}
      endDate={endDate}
      onChange={(newDates: [Date | null, Date | null]) => {
        const [start, end] = newDates;

        setDateRange([start, end]);

        if (start == null && end === null) {
          props.onFilter && props.onFilter("");
        }
      }}
      onClickOutside={() => {
        const startAt = dayjs(startDate).unix();
        const endAt = endDate ? dayjs(endDate).unix() : startAt;

        if (isNaN(startAt) === false) {
          props.onFilter && props.onFilter(`${startAt},${endAt}`);
        }
      }}
    />
  );
};
