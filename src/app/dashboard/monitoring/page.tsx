"use client";

import { useEffect, useMemo, useState } from "react";
import api from "@/api";
import withAuth from "@/components/withAuth";
import LeftSideBar from "@/components/widgets/dashboard-widgets/left-sidebar";

interface MonitoringRow {
  assignment_id: number;
  student_id: number;
  student_name: string;
  student_email: string;
  mentor_id?: number;
  mentor_name?: string;
  program_type: "course" | "internship" | "pathway";
  program_id: number;
  program_title: string;
  total_slots: number;
  used_slots: number;
  remaining_slots: number;
  expiring_slots: boolean;
  last_meeting_at?: string | null;
  last_login_date?: string | null;
  last_lms_activity_at?: string | null;
  activity_streak_7d: number;
  progress_percent?: number;
  social_points?: number;
  social_rank?: number | null;
  access_expires_at?: string | null;
  access_months_left?: number | null;
  access_expiring?: boolean;
}

interface MentorOption {
  id: number;
  username: string;
  email: string;
}

interface ProgramOption {
  program_ref: string;
  program_title: string;
  program_type: "course" | "internship" | "pathway";
}

function formatDate(value?: string | null) {
  if (!value) return "-";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "-";
  return parsed.toLocaleDateString();
}

function daysSince(value?: string | null) {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return (Date.now() - parsed.getTime()) / (1000 * 60 * 60 * 24);
}

function MonitoringPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isCxo, setIsCxo] = useState(false);
  const [isMentor, setIsMentor] = useState(false);

  const [rows, setRows] = useState<MonitoringRow[]>([]);

  const [programType, setProgramType] = useState<"" | "course" | "internship" | "pathway">("");
  const [programRef, setProgramRef] = useState<string>("");
  const [mentorId, setMentorId] = useState<string>("");
  const [mentors, setMentors] = useState<MentorOption[]>([]);
  const [programOptions, setProgramOptions] = useState<ProgramOption[]>([]);
  const [query, setQuery] = useState("");
  const [expiringOnly, setExpiringOnly] = useState(false);
  const [error, setError] = useState("");

  const [progressMin, setProgressMin] = useState("");
  const [progressMax, setProgressMax] = useState("");
  const [lastLoginWithinDays, setLastLoginWithinDays] = useState("");
  const [lastLmsWithinDays, setLastLmsWithinDays] = useState("");
  const [streakMin, setStreakMin] = useState("");
  const [streakMax, setStreakMax] = useState("");
  const [socialMin, setSocialMin] = useState("");
  const [socialMax, setSocialMax] = useState("");
  const [expiryMaxMonths, setExpiryMaxMonths] = useState("");

  const [editState, setEditState] = useState<Record<number, { total_slots: string; used_slots: string }>>({});
  const [savingRow, setSavingRow] = useState<number | null>(null);

  const fetchProfileAndData = async () => {
    setIsLoading(true);
    setError("");
    try {
      const profileRes = await api.get("/api/get-user-profile/");
      const cxo = Boolean(profileRes.data?.is_cxo);
      const mentor = Boolean(profileRes.data?.is_mentor);
      setIsCxo(cxo);
      setIsMentor(mentor);

      if (!cxo && !mentor) {
        setRows([]);
        return;
      }

      if (cxo) {
        await fetchCxoRows(programType, programRef, query, expiringOnly, mentorId);
      } else {
        await fetchMentorRows(programType, programRef, query, expiringOnly);
      }
    } catch (err) {
      setError("Unable to load monitoring data.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCxoRows = async (
    selectedType: "" | "course" | "internship" | "pathway",
    selectedProgramRef: string,
    q: string,
    expiring: boolean,
    selectedMentorId: string
  ) => {
    const res = await api.get("/api/monitoring/cxo/", {
      params: {
        ...(selectedType ? { program_type: selectedType } : {}),
        ...(selectedProgramRef ? { program_ref: selectedProgramRef } : {}),
        ...(q.trim() ? { q: q.trim() } : {}),
        ...(selectedMentorId ? { mentor_id: Number(selectedMentorId) } : {}),
        ...(expiring ? { expiring_only: 1 } : {}),
      },
    });
    setRows(Array.isArray(res.data?.results) ? res.data.results : []);
    setMentors(Array.isArray(res.data?.mentors) ? res.data.mentors : []);
    setProgramOptions(Array.isArray(res.data?.program_options) ? res.data.program_options : []);
  };

  const fetchMentorRows = async (
    selectedType: "" | "course" | "internship" | "pathway",
    selectedProgramRef: string,
    q: string,
    expiring: boolean
  ) => {
    const res = await api.get("/api/monitoring/mentor/", {
      params: {
        ...(selectedType ? { program_type: selectedType } : {}),
        ...(selectedProgramRef ? { program_ref: selectedProgramRef } : {}),
        ...(q.trim() ? { q: q.trim() } : {}),
        ...(expiring ? { expiring_only: 1 } : {}),
      },
    });
    const list = Array.isArray(res.data?.results) ? res.data.results : [];
    setRows(list);
    setProgramOptions(Array.isArray(res.data?.program_options) ? res.data.program_options : []);
    const nextEditState: Record<number, { total_slots: string; used_slots: string }> = {};
    list.forEach((item: MonitoringRow) => {
      nextEditState[item.assignment_id] = {
        total_slots: String(item.total_slots ?? 0),
        used_slots: String(item.used_slots ?? 0),
      };
    });
    setEditState(nextEditState);
  };

  useEffect(() => {
    fetchProfileAndData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleApplyFilters = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!isCxo) return;
    setIsLoading(true);
    setError("");
    try {
      await fetchCxoRows(programType, programRef, query, expiringOnly, mentorId);
    } catch (err) {
      setError("Unable to apply filters right now.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyMentorFilters = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!isMentor || isCxo) return;
    setIsLoading(true);
    setError("");
    try {
      await fetchMentorRows(programType, programRef, query, expiringOnly);
    } catch (err) {
      setError("Unable to apply filters right now.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyEmails = async () => {
    const targetEmails = filteredRows
      .map((row) => (row.student_email || "").trim().toLowerCase())
      .filter(Boolean);
    const uniqueEmails = Array.from(new Set(targetEmails));
    if (uniqueEmails.length === 0) {
      window.alert("No emails available for this filtered result.");
      return;
    }
    const csvEmails = uniqueEmails.join(", ");
    try {
      await navigator.clipboard.writeText(csvEmails);
      window.alert(`${uniqueEmails.length} email(s) copied to clipboard.`);
    } catch {
      window.alert("Could not copy automatically. Please copy manually from the list.");
    }
  };

  const handleMentorSave = async (assignmentId: number) => {
    const entry = editState[assignmentId];
    if (!entry) return;
    setSavingRow(assignmentId);
    try {
      const res = await api.patch("/api/monitoring/mentor/", {
        assignment_id: assignmentId,
        total_slots: Number(entry.total_slots || 0),
        used_slots: Number(entry.used_slots || 0),
      });
      const updated = res.data;
      setRows((prev) =>
        prev.map((row) =>
          row.assignment_id === assignmentId
            ? {
                ...row,
                total_slots: Number(updated.total_slots ?? row.total_slots),
                used_slots: Number(updated.used_slots ?? row.used_slots),
                remaining_slots: Number(updated.remaining_slots ?? row.remaining_slots),
                expiring_slots: Boolean(updated.expiring_slots),
                last_meeting_at: updated.last_meeting_at ?? row.last_meeting_at,
              }
            : row
        )
      );
    } catch {
      window.alert("Unable to update mentorship sessions right now.");
    } finally {
      setSavingRow(null);
    }
  };

  const summary = useMemo(() => {
    const expiring = rows.filter((row) => row.access_expiring).length;
    return {
      total: rows.length,
      expiring,
    };
  }, [rows]);

  const filteredRows = useMemo(() => {
    const pMin = progressMin !== "" ? Number(progressMin) : null;
    const pMax = progressMax !== "" ? Number(progressMax) : null;
    const loginDays = lastLoginWithinDays !== "" ? Number(lastLoginWithinDays) : null;
    const lmsDays = lastLmsWithinDays !== "" ? Number(lastLmsWithinDays) : null;
    const sMin = streakMin !== "" ? Number(streakMin) : null;
    const sMax = streakMax !== "" ? Number(streakMax) : null;
    const socMin = socialMin !== "" ? Number(socialMin) : null;
    const socMax = socialMax !== "" ? Number(socialMax) : null;
    const exMax = expiryMaxMonths !== "" ? Number(expiryMaxMonths) : null;

    return rows.filter((row) => {
      const progress = Number(row.progress_percent ?? 0);
      if (pMin !== null && !Number.isNaN(pMin) && progress < pMin) return false;
      if (pMax !== null && !Number.isNaN(pMax) && progress > pMax) return false;

      if (loginDays !== null && !Number.isNaN(loginDays)) {
        const loginAge = daysSince(row.last_login_date);
        if (loginAge === null || loginAge > loginDays) return false;
      }

      if (lmsDays !== null && !Number.isNaN(lmsDays)) {
        const lmsAge = daysSince(row.last_lms_activity_at);
        if (lmsAge === null || lmsAge > lmsDays) return false;
      }

      const streak = Number(row.activity_streak_7d ?? 0);
      if (sMin !== null && !Number.isNaN(sMin) && streak < sMin) return false;
      if (sMax !== null && !Number.isNaN(sMax) && streak > sMax) return false;

      const social = Number(row.social_points ?? 0);
      if (socMin !== null && !Number.isNaN(socMin) && social < socMin) return false;
      if (socMax !== null && !Number.isNaN(socMax) && social > socMax) return false;

      const monthsLeft = row.access_months_left;
      if (exMax !== null && !Number.isNaN(exMax)) {
        if (monthsLeft === null || monthsLeft === undefined || Number(monthsLeft) > exMax) return false;
      }

      if (expiringOnly && !row.access_expiring) return false;
      return true;
    });
  }, [
    rows,
    progressMin,
    progressMax,
    lastLoginWithinDays,
    lastLmsWithinDays,
    streakMin,
    streakMax,
    socialMin,
    socialMax,
    expiryMaxMonths,
    expiringOnly,
  ]);

  const visibleProgramOptions = useMemo(() => {
    const source = programOptions.length
      ? programOptions
      : rows.map((row) => ({
          program_ref: `${row.program_type}:${row.program_id}`,
          program_title: row.program_title,
          program_type: row.program_type,
        }));

    const normalized = source
      .map((item) => ({
        ...item,
        program_title: (item.program_title || "").trim(),
      }))
      .filter((item) => item.program_ref && item.program_title);

    const uniqueMap = new Map<string, ProgramOption>();
    normalized.forEach((item) => {
      if (!uniqueMap.has(item.program_ref)) {
        uniqueMap.set(item.program_ref, item);
      }
    });

    const list = Array.from(uniqueMap.values()).sort((a, b) => a.program_title.localeCompare(b.program_title));
    if (!programType) return list;
    return list.filter((item) => item.program_type === programType);
  }, [programOptions, rows, programType]);

  return (
    <main className="w-full">
      <div className="hidden md:flex flex-row w-full">
        <LeftSideBar />
        <div className="w-full min-h-screen bg-white dark:bg-[#041710]">
          <div className="w-full max-w-6xl mx-auto px-6 lg:px-8 py-8">
            <p className="text-sm text-gray-500 dark:text-gray-300">Dashboard</p>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Monitoring</h1>

            {isLoading ? (
              <p className="mt-6 text-sm text-gray-600 dark:text-gray-300">Loading monitoring dashboard...</p>
            ) : !isCxo && !isMentor ? (
              <p className="mt-6 text-sm text-gray-600 dark:text-gray-300">You do not have monitoring permissions yet.</p>
            ) : (
              <>
                <div className="mt-5 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0b1b32] px-4 py-3 text-sm text-gray-700 dark:text-gray-200 flex flex-wrap items-center gap-4">
                  <span>Total students: <strong>{summary.total}</strong></span>
                  <span>Filtered students: <strong>{filteredRows.length}</strong></span>
                  <span>Expiring access (≤ 1 month left): <strong>{summary.expiring}</strong></span>
                  {isCxo ? (
                    <button
                      type="button"
                      onClick={handleCopyEmails}
                      className="ml-auto rounded-md bg-hb-green px-3 py-2 text-xs font-semibold text-white hover:bg-green-700"
                    >
                      Copy filtered emails
                    </button>
                  ) : null}
                </div>

                {isCxo ? (
                  <form onSubmit={handleApplyFilters} className="mt-4 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0b1b32] p-4 grid grid-cols-1 md:grid-cols-6 gap-3">
                    <input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search student, mentor, or program"
                      className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#09152b] px-3 py-2 text-sm"
                    />
                    <select
                      value={programType}
                      onChange={(event) => {
                        setProgramType(event.target.value as "" | "course" | "internship" | "pathway");
                        setProgramRef("");
                      }}
                      className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#09152b] px-3 py-2 text-sm"
                    >
                      <option value="">All programs</option>
                      <option value="course">Course</option>
                      <option value="internship">Internship</option>
                      <option value="pathway">Pathway</option>
                    </select>
                    <select
                      value={programRef}
                      onChange={(event) => setProgramRef(event.target.value)}
                      className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#09152b] px-3 py-2 text-sm"
                    >
                      <option value="">All program names</option>
                      {visibleProgramOptions.map((program) => (
                        <option key={program.program_ref} value={program.program_ref}>
                          {program.program_title}
                        </option>
                      ))}
                    </select>
                    <select
                      value={mentorId}
                      onChange={(event) => setMentorId(event.target.value)}
                      className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#09152b] px-3 py-2 text-sm"
                    >
                      <option value="">All mentors</option>
                      {mentors.map((mentor) => (
                        <option key={mentor.id} value={String(mentor.id)}>
                          {mentor.username}
                        </option>
                      ))}
                    </select>
                    <label className="inline-flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
                      <input
                        type="checkbox"
                        checked={expiringOnly}
                        onChange={(event) => setExpiringOnly(event.target.checked)}
                      />
                      Expiring access only
                    </label>
                    <button
                      type="submit"
                      className="rounded-md bg-hb-green px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                    >
                      Apply filters
                    </button>
                  </form>
                ) : null}

                {isMentor && !isCxo ? (
                  <form onSubmit={handleApplyMentorFilters} className="mt-4 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0b1b32] p-4 grid grid-cols-1 md:grid-cols-4 gap-3">
                    <input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search student or program"
                      className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#09152b] px-3 py-2 text-sm"
                    />
                    <select
                      value={programType}
                      onChange={(event) => {
                        setProgramType(event.target.value as "" | "course" | "internship" | "pathway");
                        setProgramRef("");
                      }}
                      className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#09152b] px-3 py-2 text-sm"
                    >
                      <option value="">All programs</option>
                      <option value="course">Course</option>
                      <option value="internship">Internship</option>
                      <option value="pathway">Pathway</option>
                    </select>
                    <select
                      value={programRef}
                      onChange={(event) => setProgramRef(event.target.value)}
                      className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#09152b] px-3 py-2 text-sm"
                    >
                      <option value="">All program names</option>
                      {visibleProgramOptions.map((program) => (
                        <option key={program.program_ref} value={program.program_ref}>
                          {program.program_title}
                        </option>
                      ))}
                    </select>
                    <button
                      type="submit"
                      className="rounded-md bg-hb-green px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                    >
                      Apply filters
                    </button>
                  </form>
                ) : null}

                {(isCxo || isMentor) ? (
                  <div className="mt-4 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0b1b32] p-4 grid grid-cols-1 md:grid-cols-5 gap-3">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={progressMin}
                      onChange={(event) => setProgressMin(event.target.value)}
                      placeholder="Progress min %"
                      className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#09152b] px-3 py-2 text-sm"
                    />
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={progressMax}
                      onChange={(event) => setProgressMax(event.target.value)}
                      placeholder="Progress max %"
                      className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#09152b] px-3 py-2 text-sm"
                    />
                    <select
                      value={lastLoginWithinDays}
                      onChange={(event) => setLastLoginWithinDays(event.target.value)}
                      className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#09152b] px-3 py-2 text-sm"
                    >
                      <option value="">Last login: any time</option>
                      <option value="7">Last login: 7 days</option>
                      <option value="14">Last login: 14 days</option>
                      <option value="30">Last login: 30 days</option>
                      <option value="90">Last login: 90 days</option>
                    </select>
                    <select
                      value={lastLmsWithinDays}
                      onChange={(event) => setLastLmsWithinDays(event.target.value)}
                      className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#09152b] px-3 py-2 text-sm"
                    >
                      <option value="">Last LMS activity: any time</option>
                      <option value="7">Last LMS activity: 7 days</option>
                      <option value="14">Last LMS activity: 14 days</option>
                      <option value="30">Last LMS activity: 30 days</option>
                      <option value="90">Last LMS activity: 90 days</option>
                    </select>
                    <input
                      type="number"
                      min={0}
                      max={7}
                      value={streakMin}
                      onChange={(event) => setStreakMin(event.target.value)}
                      placeholder="7-day streak min"
                      className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#09152b] px-3 py-2 text-sm"
                    />
                    <input
                      type="number"
                      min={0}
                      max={7}
                      value={streakMax}
                      onChange={(event) => setStreakMax(event.target.value)}
                      placeholder="7-day streak max"
                      className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#09152b] px-3 py-2 text-sm"
                    />
                    <input
                      type="number"
                      min={0}
                      value={socialMin}
                      onChange={(event) => setSocialMin(event.target.value)}
                      placeholder="Social sessions min"
                      className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#09152b] px-3 py-2 text-sm"
                    />
                    <input
                      type="number"
                      min={0}
                      value={socialMax}
                      onChange={(event) => setSocialMax(event.target.value)}
                      placeholder="Social sessions max"
                      className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#09152b] px-3 py-2 text-sm"
                    />
                    <input
                      type="number"
                      min={0}
                      step="0.1"
                      value={expiryMaxMonths}
                      onChange={(event) => setExpiryMaxMonths(event.target.value)}
                      placeholder="Expiry: max months left"
                      className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#09152b] px-3 py-2 text-sm"
                    />
                    <label className="inline-flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
                      <input
                        type="checkbox"
                        checked={expiringOnly}
                        onChange={(event) => setExpiringOnly(event.target.checked)}
                      />
                      Expiring access only
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setProgressMin("");
                        setProgressMax("");
                        setLastLoginWithinDays("");
                        setLastLmsWithinDays("");
                        setStreakMin("");
                        setStreakMax("");
                        setSocialMin("");
                        setSocialMax("");
                        setExpiryMaxMonths("");
                        setExpiringOnly(false);
                      }}
                      className="rounded-md border border-hb-green px-4 py-2 text-sm font-semibold text-hb-green"
                    >
                      Clear metric filters
                    </button>
                  </div>
                ) : null}

                {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}

                <div className="mt-4 overflow-x-auto rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0b1b32]">
                  <table className="min-w-[1100px] w-full text-sm">
                    <thead className="bg-gray-50 dark:bg-[#09152b] text-gray-700 dark:text-gray-200">
                      <tr>
                        <th className="text-left px-3 py-2">Student</th>
                        {isCxo ? <th className="text-left px-3 py-2">Mentor</th> : null}
                        <th className="text-left px-3 py-2">Program</th>
                        <th className="text-left px-3 py-2">Progress</th>
                        <th className="text-left px-3 py-2">Last login</th>
                        <th className="text-left px-3 py-2">Last LMS activity</th>
                        <th className="text-left px-3 py-2">7-day streak</th>
                        <th className="text-left px-3 py-2">Social sessions</th>
                        <th className="text-left px-3 py-2">Sessions</th>
                        <th className="text-left px-3 py-2">Access left</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRows.map((row) => {
                        const edit = editState[row.assignment_id] || {
                          total_slots: String(row.total_slots ?? 0),
                          used_slots: String(row.used_slots ?? 0),
                        };
                        return (
                          <tr key={row.assignment_id} className="border-t border-gray-100 dark:border-gray-800 align-top">
                            <td className="px-3 py-3">
                              <div className="font-semibold text-gray-900 dark:text-gray-100">{row.student_name}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-300">{row.student_email}</div>
                            </td>
                            {isCxo ? <td className="px-3 py-3 text-gray-700 dark:text-gray-200">{row.mentor_name || "Unassigned"}</td> : null}
                            <td className="px-3 py-3 text-gray-700 dark:text-gray-200">
                              <div className="capitalize">{row.program_type}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-300">{row.program_title}</div>
                            </td>
                            <td className="px-3 py-3 text-gray-700 dark:text-gray-200">{Number(row.progress_percent || 0).toFixed(2)}%</td>
                            <td className="px-3 py-3 text-gray-700 dark:text-gray-200">{formatDate(row.last_login_date)}</td>
                            <td className="px-3 py-3 text-gray-700 dark:text-gray-200">{formatDate(row.last_lms_activity_at)}</td>
                            <td className="px-3 py-3 text-gray-700 dark:text-gray-200">{row.activity_streak_7d || 0}/7</td>
                            <td className="px-3 py-3 text-gray-700 dark:text-gray-200">
                              {row.social_points ?? 0} {row.social_rank ? `( #${row.social_rank} )` : ""}
                            </td>
                            <td className="px-3 py-3">
                              {isMentor && !isCxo ? (
                                <div className="flex items-center gap-2">
                                  <input
                                    type="number"
                                    min={0}
                                    className="w-16 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#09152b] px-2 py-1 text-xs"
                                    value={edit.used_slots}
                                    onChange={(event) =>
                                      setEditState((prev) => ({
                                        ...prev,
                                        [row.assignment_id]: { ...edit, used_slots: event.target.value },
                                      }))
                                    }
                                  />
                                  <span className="text-xs text-gray-500 dark:text-gray-300">/</span>
                                  <input
                                    type="number"
                                    min={0}
                                    className="w-16 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#09152b] px-2 py-1 text-xs"
                                    value={edit.total_slots}
                                    onChange={(event) =>
                                      setEditState((prev) => ({
                                        ...prev,
                                        [row.assignment_id]: { ...edit, total_slots: event.target.value },
                                      }))
                                    }
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleMentorSave(row.assignment_id)}
                                    disabled={savingRow === row.assignment_id}
                                    className="rounded-md border border-hb-green px-2 py-1 text-xs font-semibold text-hb-green"
                                  >
                                    {savingRow === row.assignment_id ? "Saving..." : "Save"}
                                  </button>
                                </div>
                              ) : (
                                <span className="text-gray-700 dark:text-gray-200">
                                  {row.used_slots}/{row.total_slots} (left: {row.remaining_slots})
                                </span>
                              )}
                            </td>
                            <td className="px-3 py-3">
                              {row.access_months_left !== null && row.access_months_left !== undefined ? (
                                <span className="text-xs text-gray-700 dark:text-gray-200">
                                  {Number(row.access_months_left).toFixed(2)} month(s)
                                </span>
                              ) : <span className="text-xs text-gray-500 dark:text-gray-300">-</span>}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="md:hidden w-full min-h-svh bg-white dark:bg-[#041710]">
        <LeftSideBar />
        <div className="px-4 pb-6">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Monitoring</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            {isCxo ? "Customer Experience Officer view" : isMentor ? "Mentor view" : "No monitoring access"}
          </p>
          {isCxo ? (
            <button
              type="button"
              onClick={handleCopyEmails}
              className="mt-3 rounded-md bg-hb-green px-3 py-2 text-xs font-semibold text-white"
            >
              Copy filtered emails
            </button>
          ) : null}
          {(isCxo || isMentor) ? (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setIsLoading(true);
                setError("");
                const action = isCxo
                  ? fetchCxoRows(programType, programRef, query, expiringOnly, mentorId)
                  : fetchMentorRows(programType, programRef, query, expiringOnly);
                action
                  .catch(() => setError("Unable to apply filters right now."))
                  .finally(() => setIsLoading(false));
              }}
              className="mt-3 flex flex-col gap-2"
            >
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search student or program"
                className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#09152b] px-3 py-2 text-sm"
              />
              <select
                value={programType}
                onChange={(event) => {
                  setProgramType(event.target.value as "" | "course" | "internship" | "pathway");
                  setProgramRef("");
                }}
                className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#09152b] px-3 py-2 text-sm"
              >
                <option value="">All programs</option>
                <option value="course">Course</option>
                <option value="internship">Internship</option>
                <option value="pathway">Pathway</option>
              </select>
              <select
                value={programRef}
                onChange={(event) => setProgramRef(event.target.value)}
                className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#09152b] px-3 py-2 text-sm"
              >
                <option value="">All program names</option>
                {visibleProgramOptions.map((program) => (
                  <option key={program.program_ref} value={program.program_ref}>
                    {program.program_title}
                  </option>
                ))}
              </select>
              {isCxo ? (
                <select
                  value={mentorId}
                  onChange={(event) => setMentorId(event.target.value)}
                  className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#09152b] px-3 py-2 text-sm"
                >
                  <option value="">All mentors</option>
                  {mentors.map((mentor) => (
                    <option key={mentor.id} value={String(mentor.id)}>
                      {mentor.username}
                    </option>
                  ))}
                </select>
              ) : null}
              <label className="inline-flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
                <input
                  type="checkbox"
                  checked={expiringOnly}
                  onChange={(event) => setExpiringOnly(event.target.checked)}
                />
                      Expiring access only
              </label>
              <button
                type="submit"
                className="rounded-md bg-hb-green px-3 py-2 text-sm font-semibold text-white"
              >
                Apply filters
              </button>
            </form>
          ) : null}
          <div className="mt-4 flex flex-col gap-3">
            {filteredRows.map((row) => {
              const edit = editState[row.assignment_id] || {
                total_slots: String(row.total_slots ?? 0),
                used_slots: String(row.used_slots ?? 0),
              };
              return (
                <div key={row.assignment_id} className="rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0b1b32] p-3">
                  <p className="font-semibold text-gray-900 dark:text-gray-100">{row.student_name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-300">{row.student_email}</p>
                  <p className="mt-1 text-sm text-gray-700 dark:text-gray-200">{row.program_type}: {row.program_title}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">Progress {Number(row.progress_percent || 0).toFixed(2)}% • Streak {row.activity_streak_7d}/7</p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">Slots {row.used_slots}/{row.total_slots} (left {row.remaining_slots})</p>
                  {isMentor && !isCxo ? (
                    <div className="mt-2 flex items-center gap-2">
                      <input
                        type="number"
                        min={0}
                        className="w-16 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#09152b] px-2 py-1 text-xs"
                        value={edit.used_slots}
                        onChange={(event) =>
                          setEditState((prev) => ({
                            ...prev,
                            [row.assignment_id]: { ...edit, used_slots: event.target.value },
                          }))
                        }
                      />
                      <input
                        type="number"
                        min={0}
                        className="w-16 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#09152b] px-2 py-1 text-xs"
                        value={edit.total_slots}
                        onChange={(event) =>
                          setEditState((prev) => ({
                            ...prev,
                            [row.assignment_id]: { ...edit, total_slots: event.target.value },
                          }))
                        }
                      />
                      <button
                        type="button"
                        onClick={() => handleMentorSave(row.assignment_id)}
                        disabled={savingRow === row.assignment_id}
                        className="rounded-md border border-hb-green px-2 py-1 text-xs font-semibold text-hb-green"
                      >
                        {savingRow === row.assignment_id ? "Saving..." : "Save"}
                      </button>
                    </div>
                  ) : null}
                  {row.access_months_left !== null && row.access_months_left !== undefined ? (
                    <p className="mt-2 text-xs text-gray-600 dark:text-gray-300">
                      Access expires in {Number(row.access_months_left).toFixed(2)} month(s)
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}

const PageWrapper = () => <MonitoringPage />;

export default withAuth({ children: <PageWrapper /> });
