import { Pagination } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { PaginationProps } from "../types/paginationProps";

export default function PaginationRounded({
  totalCount,
  PAGE_SIZE,
}: PaginationProps) {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  function handleChange(_event: React.ChangeEvent<unknown>, value: number) {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", value.toString());

    navigate(`?${params.toString()}`);
  }

  return (
<Pagination
  count={Math.ceil(totalCount / PAGE_SIZE)}
  page={currentPage}
  variant="outlined"
  shape="rounded"
  onChange={handleChange}
  sx={{
    "& .MuiPaginationItem-root": {
      color: "#93c5fd",       
      borderColor: "#3b82f6",
    },
    "& .MuiPaginationItem-icon": {
      color: "#93c5fd",      
    },
    "& .Mui-selected": {
      backgroundColor: "#3b82f6",
      color: "#f7f8f9",
      "&:hover": { backgroundColor: "#2563eb" },
    },
  }}
/>
  );
}
