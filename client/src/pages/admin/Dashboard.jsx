import React, { useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import BlogTableItem from "../../components/admin/BlogTableItem";
import { useAppContext } from "../../context/AppContext.jsx";
import toast from "react-hot-toast";
const Dashboard = () => {
  const { axios } = useAppContext();

  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });

  // creating a function such that it will fetch the data from the backend
  const fetchDashboard = async () => {
    try {
      const { data } = await axios.get("/api/admin/dashboard");
      if (data.success) {
        setDashboardData(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);
  return (
    <div className="flex-1 p-4 md:p-10 bg-blue-50/50">
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img src={assets.dashboard_icon_1} />
          <p className="text-xl font-semibold text-gray-600">
            {dashboardData.blogs}
          </p>
          <p className="font-light text-gray-400">Blogs</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img src={assets.dashboard_icon_2} />
          <p className="text-xl font-semibold text-gray-600">
            {dashboardData.comments}
          </p>
          <p className="font-light text-gray-400">Comments</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img src={assets.dashboard_icon_3} />
          <p className="text-xl font-semibold text-gray-600">
            {dashboardData.drafts}
          </p>
          <p className="font-light text-gray-400">Drafts</p>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-3 m-4 mt-6 text-gray-600">
          <img src={assets.dashboard_icon_4} />
          <p>Latest Blogs</p>
        </div>
        <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
          <table className="w-full text-sm text-gray-500">
            <thead className="text-xs text-gray-600 text-left uppercase">
              <tr>
                <th scope="col" className="px-3 py-4 xl:px-6">
                  #
                </th>
                <th scope="col" className="px-3 py-4">
                  Blog Title
                </th>
                <th scope="col" className="px-3 py-4 max-sm:hidden">
                  Date
                </th>
                <th scope="col" className="px-3 py-4 max-sm:hidden">
                  Status
                </th>
                <th scope="col" className="px-3 py-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentBlogs.map((blog, index) => {
                return (
                  <BlogTableItem
                    key={blog._id}
                    blog={blog}
                    fetchBlogs={fetchDashboard}
                    index={index + 1}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
