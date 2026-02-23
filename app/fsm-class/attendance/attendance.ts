export var attendanceData = [
    {
        date: '2026-01-22',
        dateReadable: 'jan_22',
        bloc: '3a',
        studentsAbsent: []
    },
    {
        date: '2026-01-22',
        dateReadable: 'jan_29',
        bloc: '3a',
        studentsAbsent: [6,7,8,13,33]
    },
    {
        date: '2026-02-05',
        dateReadable: 'feb_5',
        bloc: '3a',
        studentsAbsent: []
    },
    {
        date: '2026-01-12',
        dateReadable: 'feb_12',
        bloc: '3a',
        studentsAbsent: [1, 5]
    }
]


export const getAttendance = (date: string, bloc: string) => {
    return attendanceData.filter(attendance => attendance.date === date && attendance.bloc === bloc);
}

export const getAllAttendance = () => {
    return attendanceData
}