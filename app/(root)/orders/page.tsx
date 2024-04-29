import { getOrdersByRaid } from "@/lib/actions/order.actions";
import { formatDateTime, formatPrice } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import { IOrderItem } from "@/lib/database/models/order.model";
import { CurlBottom, CurlTop, Search } from "@/components/shared";

import ParallaxSection from "@/components/motion/ParallaxSection";
import Contact from "@/components/motion/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Realm Raiders - Orders",
};

const Orders = async ({ searchParams }: SearchParamProps) => {
  const raidId = (searchParams?.raidId as string) || "";
  const searchText = (searchParams?.query as string) || "";

  const orders = await getOrdersByRaid({ raidId, searchString: searchText });

  return (
    <main className='flex flex-col bg-primary-50'>
      {/* HEADER SECTION */}
      <ParallaxSection
        backgroundImage="url('/assets/images/backgroundWeapons.png')"
        backgroundPosition='top'
        backgroundSize='cover'
        sectionClassName='flex-center flex-col relative overflow-hidden pt-[80px] pb-[60px] lg:py-[120px] blue-gradient '
        motionDivClassName='absolute inset-0 bg-no-repeat opacity-80 z-0'
      >
        <div className='py-8 w-[80%] max-w-[1080px] relative text-center break-words text-primary-50 '>
          <h3 className='h3-special py-5'>User</h3>
          <h1 className='h1-bold pb-5'>Orders</h1>
        </div>

        <div
          style={{
            backgroundImage: "url('/assets/icons/swirl.svg')",
            backgroundSize: "100%",
            transform: "scale(-1, 1)",
          }}
          className='absolute bottom-0 h-[100px] lg:h-[250px] w-full bg-no-repeat'
        />
      </ParallaxSection>

      <ParallaxSection
        sectionClassName='flex flex-col relative py-[80px] overflow-hidden'
        motionDivClassName='-left-[500px] -top-[100px] absolute  w-[1500px] h-[1500px] z-0'
        backgroundImage="url('/assets/icons/compass.svg')"
        backgroundPosition='center'
        backgroundSize='cover'
      >
        <CurlTop />
        <div className='bg-primary-700 p-8 flex-center flex-col relative'>
          <h2 className='h2-bold py-10 md:leading-10 md:py-14'>Your Orders</h2>

          <div className='w-full max-w-[90%] md:max-w-[70%] lg:max-w-[60%] xl:max-w-[50%] '>
            <Search />
          </div>

          <div className='wrapper my-10 lg:my-14'>
            <table className='w-full bg-primary-50 flex items-start flex-col px-10 py-10 rounded-md overflow-x-scroll'>
              <thead>
                <tr className='p-bold-16 border-y border-gray-300 text-primary-500 '>
                  <th className='min-w-[250px] py-3 text-left'>Order ID</th>
                  <th className='min-w-[200px] flex-1 py-3 text-left'>
                    Raid Title
                  </th>
                  <th className='min-w-[150px] py-3 text-left'>Buyer</th>
                  <th className='min-w-[100px] py-3 text-left'>Created</th>
                  <th className='min-w-[135px] lg:min-w-[167px] py-3 text-right '>
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders && orders.length === 0 ? (
                  <tr className='border-b'>
                    <td colSpan={5} className='py-4 text-center text-gray-500'>
                      No orders found.
                    </td>
                  </tr>
                ) : (
                  <>
                    {orders &&
                      orders.map((row: IOrderItem) => (
                        <tr
                          key={row._id}
                          className='p-regular-14 lg:p-regular-16 border-b text-primary-100'
                          style={{ boxSizing: "border-box" }}
                        >
                          <td className='min-w-[250px] py-4 text-primary-500'>
                            {row._id}
                          </td>
                          <td className='min-w-[200px] flex-1 py-4 pr-4'>
                            {row.raidTitle}
                          </td>
                          <td className='min-w-[150px] py-4'>{row.buyer}</td>
                          <td className='min-w-[100px] py-4'>
                            {formatDateTime(row.createdAt).dateTime}
                          </td>
                          <td className='min-w-[100px] py-4 text-right'>
                            {formatPrice(row.totalAmount)}
                          </td>
                        </tr>
                      ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <CurlBottom />
      </ParallaxSection>
      <Contact />
    </main>
  );
};

export default Orders;
