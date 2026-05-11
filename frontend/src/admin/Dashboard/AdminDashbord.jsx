import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Utils/Layout";
import axios from "axios";
import { server } from "../../main";

const AdminDashbord = ({ user }) => {
  const navigate = useNavigate();

  if (user && user.role !== "admin") return navigate("/");

  const [stats, setStats] = useState([]);

  async function fetchStats() {
    try {
      const { data } = await axios.get(`${server}/api/stats`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setStats(data.stats);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);
  
  return (
    <div>
      <Layout>
        <div className="main-content grid grid-cols-1 md:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto">
          <div className="box bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-8 text-white transform hover:scale-105 transition-all duration-300">
            <div className="flex flex-col items-center justify-center text-center">
              <svg className="w-12 h-12 mb-4 text-white opacity-80" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.522 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.587v2.652z" />
              </svg>
              <p className="text-lg font-semibold uppercase tracking-wide mb-2">Total Courses</p>
              <p className="text-4xl font-bold">{stats.totalCoures || 0}</p>
            </div>
          </div>
          
          <div className="box bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-8 text-white transform hover:scale-105 transition-all duration-300">
            <div className="flex flex-col items-center justify-center text-center">
              <svg className="w-12 h-12 mb-4 text-white opacity-80" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.255 0 2.443.29 3.5.804v-10zM11 14.804A7.968 7.968 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804v10zM10 10a5 5 0 110-10 5 5 0 010 10z" />
              </svg>
              <p className="text-lg font-semibold uppercase tracking-wide mb-2">Total Lectures</p>
              <p className="text-4xl font-bold">{stats.totalLectures || 0}</p>
            </div>
          </div>
          
          <div className="box bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-8 text-white transform hover:scale-105 transition-all duration-300">
            <div className="flex flex-col items-center justify-center text-center">
              <svg className="w-12 h-12 mb-4 text-white opacity-80" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              <p className="text-lg font-semibold uppercase tracking-wide mb-2">Total Users</p>
              <p className="text-4xl font-bold">{stats.totalUsers || 0}</p>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default AdminDashbord;