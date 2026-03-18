"use client";

import { useEffect, useState } from "react";
import api from "@/api";
import withAuth from "@/components/withAuth";
import LeftSideBar from "@/components/widgets/dashboard-widgets/left-sidebar";

interface InternshipItem {
  id?: number | string;
  title?: string;
}

interface LeaderboardRow {
  rank: number;
  user_id?: number | null;
  username: string;
  xp: number;
  normalized_xp: number;
  normalized_percent: number;
  social_score?: number;
}

function Page() {
  const [internships, setInternships] = useState<InternshipItem[]>([]);
  const [selectedInternshipId, setSelectedInternshipId] = useState<string>("");
  const [leaderboard, setLeaderboard] = useState<LeaderboardRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchLeaderboard = async (internshipId: string) => {
    if (!internshipId) return;
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/api/leaderboard/internship/", {
        params: { internship_id: internshipId },
      });
      if (res.status === 200) {
        setLeaderboard(res.data?.results || []);
      }
    } catch (err) {
      console.error("Error fetching leaderboard:", err);
      setError("Unable to load leaderboard. Please try again.");
      setLeaderboard([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadInternships = async () => {
      try {
        const profileRes = await api.get("/api/get-user-profile/");
        const profile = profileRes.data;
        const enrolledIds = Array.isArray(profile?.Internships)
          ? profile.Internships.map((id: any) => Number(id))
          : profile?.Internships
            ? [Number(profile.Internships)]
            : [];

        const internshipsRes = await api.get("/api/internships/");
        const available = internshipsRes.data.filter((internship: { id: number | string }) =>
          enrolledIds.includes(Number(internship.id))
        );
        setInternships(available);

        if (available.length > 0) {
          const firstId = String(available[0].id);
          setSelectedInternshipId(firstId);
          fetchLeaderboard(firstId);
        }
      } catch (err) {
        console.error("Error loading internships:", err);
        setError("Unable to load internships.");
      }
    };

    loadInternships();
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchLeaderboard(selectedInternshipId);
  };

  return (
    <main className="w-full">
      <div className="hidden md:flex flex-row w-full">
        <LeftSideBar />
        <div className="w-full min-h-screen bg-white">
          <div className="w-full max-w-6xl mx-auto px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Dashboard</p>
                <h1 className="text-2xl font-semibold text-gray-900">Leaderboard</h1>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Filter by internship</label>
                <select
                  value={selectedInternshipId}
                  onChange={(event) => setSelectedInternshipId(event.target.value)}
                  className="min-w-60 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm"
                >
                  <option value="">Select internship</option>
                  {internships.map((internship) => (
                    <option key={internship.id} value={String(internship.id)}>
                      {internship.title || "Untitled internship"}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-fit rounded-md bg-hb-green px-4 py-2 text-sm font-semibold text-white hover:bg-hb-green-dark"
              >
                Apply
              </button>
            </form>

            {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

            <div className="mt-6 flex flex-col gap-3">
              <p className="text-xs text-gray-600">
                Score uses normalized XP (base 10 XP removed). Attempts reduce points. Percent is normalized XP divided by total internship XP.
              </p>
              <div className="flex items-center justify-between text-xs font-semibold uppercase text-gray-500">
                <span>Rank</span>
                <span className="flex-1 pl-6">User</span>
                <span className="w-24 text-right">XP</span>
                <span className="w-20 text-right">%</span>
                <span className="w-20 text-right">Social</span>
              </div>

              {loading ? (
                <div className="rounded-md border border-gray-200 bg-white px-4 py-4 text-sm text-gray-600">
                  Loading leaderboard...
                </div>
              ) : leaderboard.length === 0 ? (
                <div className="rounded-md border border-gray-200 bg-white px-4 py-4 text-sm text-gray-600">
                  No leaderboard data available.
                </div>
              ) : (
                leaderboard.map((row) => (
                  <div
                    key={`${row.user_id ?? row.username}-${row.rank}`}
                    className="flex items-center justify-between rounded-md border border-gray-200 bg-white px-4 py-4 text-sm"
                  >
                    <span className="text-gray-500">
                      {row.rank === 1 ? "🥇" : row.rank === 2 ? "🥈" : row.rank === 3 ? "🥉" : "#"}
                      {row.rank}
                    </span>
                    <span className="flex-1 pl-6 font-semibold text-gray-900">{row.username}</span>
                    <span className="w-24 text-right font-semibold text-gray-900">{row.normalized_xp} XP</span>
                    <span className="w-20 text-right text-xs text-gray-600">{row.normalized_percent}%</span>
                    <span className="w-20 text-right text-xs text-gray-600">{row.social_score ?? 0}%</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden w-full min-h-svh bg-white">
        <LeftSideBar />
        <div className="w-full max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-xl font-semibold text-gray-900">Leaderboard</h1>

          <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
            <label className="text-sm font-semibold text-gray-700">Filter by internship</label>
            <select
              value={selectedInternshipId}
              onChange={(event) => setSelectedInternshipId(event.target.value)}
              className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm"
            >
              <option value="">Select internship</option>
              {internships.map((internship) => (
                <option key={internship.id} value={String(internship.id)}>
                  {internship.title || "Untitled internship"}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="w-fit rounded-md bg-hb-green px-4 py-2 text-sm font-semibold text-white"
            >
              Apply
            </button>
          </form>

          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

          <div className="mt-5 flex flex-col gap-3">
            <p className="text-xs text-gray-600">
              Score uses normalized XP (base 10 XP removed). Attempts reduce points. Percent is normalized XP divided by total internship XP.
            </p>
            {loading ? (
              <div className="rounded-md border border-gray-200 bg-white px-4 py-4 text-sm text-gray-600">
                Loading leaderboard...
              </div>
            ) : leaderboard.length === 0 ? (
              <div className="rounded-md border border-gray-200 bg-white px-4 py-4 text-sm text-gray-600">
                No leaderboard data available.
              </div>
            ) : (
              leaderboard.map((row) => (
                <div
                  key={`${row.user_id ?? row.username}-${row.rank}`}
                  className="rounded-md border border-gray-200 bg-white px-4 py-4 text-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">
                      {row.rank === 1 ? "🥇" : row.rank === 2 ? "🥈" : row.rank === 3 ? "🥉" : "#"}
                      {row.rank}
                    </span>
                    <span className="text-right">
                      <span className="block font-semibold text-gray-900">{row.normalized_xp} XP</span>
                      <span className="block text-xs text-gray-500">{row.normalized_percent}%</span>
                      <span className="block text-xs text-gray-500">Social {row.social_score ?? 0}%</span>
                    </span>
                  </div>
                  <p className="mt-2 font-semibold text-gray-900">{row.username}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

const PageWrapper = () => <Page />;

export default withAuth({ children: <PageWrapper /> });
