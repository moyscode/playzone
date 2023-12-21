import styles from './summaryTable.module.css';
import { useRouter } from 'next/router';
import Image from 'next/image';
import LeftBottom from '../../assets/svg/LeftBottom.svg';
import RightTop from '../../assets/svg/RightTop.svg';
import NotFound from '../../assets/svg/not_found2.svg';
import {
  MonthlyPlayerData,
  AllMonthlyPlayerData,
} from '../../../ProjectTypes.types';

import { useCallback, useEffect, useState, useMemo } from 'react';
import {
  flexRender,
  getCoreRowModel,
  SortingState,
  useReactTable,
  getSortedRowModel,
  ColumnDef,
} from '@tanstack/react-table';

export const SummaryTable = ({
  currentMonth,
  monthNumber,
  year,
}: {
  currentMonth: string;
  monthNumber: number;
  year: number;
}) => {
  const [allPlayerData, setAllPlayerData] = useState<AllMonthlyPlayerData>([]);

  const month = monthNumber + 1;

  const router = useRouter();
  const goRouteId = (player: string) => {
    router.push(`/playerSummary/${player}`);
  };

  const getAllPlayerDataForMonth = useCallback(
    async (url: string) => {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ year, month }),
      });
      const data = await response.json();
      const monthlyData = data.map((obj: any) => ({
        ...obj,
        cost:
          obj['hours_played'] * 90 +
          (obj['confirmedAndNotPlayed'] + obj['notConfirmedAndPlayed'] > 1
            ? (obj['confirmedAndNotPlayed'] +
                obj['notConfirmedAndPlayed'] -
                1) *
              45
            : 0),
      }));

      setAllPlayerData(monthlyData);
    },
    [year, month]
  );

  useEffect(() => {
    getAllPlayerDataForMonth('/api/getAllPlayerDetailsForMonth');
  }, [getAllPlayerDataForMonth]);

  const columns = useMemo<ColumnDef<MonthlyPlayerData>[]>(
    () => [
      {
        accessorKey: 'name',
        header: () => 'Name',
      },
      {
        accessorKey: 'hours_played',
        header: () => 'Hrs',
      },
      {
        accessorKey: 'confirmedAndNotPlayed',
        header: () => 'C&NP',
      },
      {
        accessorKey: 'notConfirmedAndPlayed',
        header: () => 'NC&P',
      },
      {
        accessorKey: 'cost',
        header: () => 'COST',
      },
    ],
    []
  );

  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: allPlayerData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  const isEmptyArray = allPlayerData.length === 0;

  return (
    <>
      {isEmptyArray ? (
        <div className={`${styles['no-summary']}`}>
          <Image
            src={RightTop}
            alt='background'
            className={`${styles['left-top']}`}
          />

          <Image
            src={NotFound}
            alt='background'
            className={`${styles['not-found']}`}
          />
          <Image
            src={LeftBottom}
            alt='background'
            className={`${styles['right-bottom']}`}
          />
        </div>
      ) : (
        <>
          <Image
            src={RightTop}
            alt='background'
            className={`${styles['left-top']}`}
          />
          <Image
            src={LeftBottom}
            alt='background'
            className={`${styles['right-bottom']}`}
          />
          <p className={`${styles.hint}`}>
            Click on the name to see the details
          </p>
          <table className={`${styles.table}`}>
            <thead>
              {table.getHeaderGroups().map((headerGroup: any) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header: any) => (
                    <th
                      key={header.id}
                      {...{
                        className: header.column.getCanSort()
                          ? 'cursor-pointer select-none'
                          : '',
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      <span
                        className={`material-symbols-rounded
                    ${
                      header.column.getIsSorted() === 'asc' ||
                      header.column.getIsSorted() === 'desc'
                        ? styles.active
                        : ''
                    }`}
                      >
                        {{ asc: 'arrow_drop_up', desc: 'arrow_drop_down' }[
                          header.column.getIsSorted() as string
                        ] ?? 'sort'}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className={`${styles.tbody}`}>
              {table.getRowModel().rows.map((row: any) => (
                <tr key={row.id} onClick={() => goRouteId(row.original.name)}>
                  {row.getVisibleCells().map((cell: any) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};
