import { lusitana } from '@/app/ui/fonts';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import Pagination from '@/app/ui/invoices/pagination';
import Table from '@/app/ui/invoices/table'
import Search from '@/app/ui/search';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import React, { Suspense } from 'react'
import { fetchInvoicesPages } from '@/app/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Invoices"
}

const Page = async (props: {
    searchParams?: Promise<{
        query?: string,
        page?: string
    }>
}) => {

    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page || 1);
    const totalPages = await fetchInvoicesPages(query);

    return (
        <main className='w-full'>
            <div className="flex w-full items-center justify-betwee">
                <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder='Search Invoices' />
                <CreateInvoice />
            </div>
            <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
                <Table query={query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </main>
    )
}

export default Page;
