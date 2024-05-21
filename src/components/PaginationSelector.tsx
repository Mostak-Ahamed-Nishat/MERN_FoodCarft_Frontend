import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

type Props = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};

function PaginationSelector({ page, pages, onPageChange }: Props) {
  const pageNumber = [];

  // if pages=3 => pageNumber=[1,2,3]

  for (let i = 1; i <= pages; i++) {
    pageNumber.push(i);
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" onClick={() => onPageChange(page - 1)} />
        </PaginationItem>
        {pageNumber.map((number) => (
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={() => onPageChange(number)}
              isActive={page == number}
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* 
            pageNumber =[1,2,3]
            page?=3 hide next button 
        */}

        {page !== pageNumber.length && (
          <PaginationItem>
            <PaginationNext href="#" onClick={() => onPageChange(page + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationSelector;
