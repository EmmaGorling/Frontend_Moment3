"use strict"

window.onload = init;


// Hämta datan
async function init() {
    try {
        const response = await fetch('https://studenter.miun.se/~mallar/dt211g/');
        const data = await response.json(); 

        //Sortera ut kurser och program
        const courses = data.filter((item) => item.type === 'Kurs');
        const programs = data.filter((item) => item.type === 'Program');

        sortCourses(courses);
        sortPrograms(programs);
    } catch {
        document.getElementById('error').innerHTML = 'Datan kunde inte hämtas.'
    }
}

// Sortera Kurser
function sortCourses(courses) {
    
    courses.sort(function(a, b){
        return b.applicantsTotal - a.applicantsTotal;
    });   

    const wantedCourses = courses.slice(0, 6);

    showCourseChart(wantedCourses);
    
};

// Skriva ut diagram över kurser
function showCourseChart(courses) {
    
    // Hämta canvas-elementet
    const courseChart = document.getElementById('courses');

    // Göra arrayer att använda i chart
    const courseName = courses.map((item) => {
        return item.name;
    });
    const courseApplicants = courses.map((item) => {
        return item.applicantsTotal
    });

    // Göra ett nytt Chart
    new Chart(courseChart, {
        type: 'bar',
        data: {
          labels: courseName,
          datasets: [{
            label: 'Totalt antal sökande',
            data: courseApplicants,
            backgroundColor: [
                'rgba(62, 187, 170, 0.6)',
            ],
            borderWidth: 1
          }]
        },
        options: {
            indexAxis: 'y',
            scales: {
                y: {
                beginAtZero: true
                }
            }
        }
      });

}

// Sortera program
function sortPrograms(programs) {
    
    programs.sort(function(a, b){
        return b.applicantsTotal - a.applicantsTotal;
    });   

    const wantedPrograms = programs.slice(0, 5);

    showProgChart(wantedPrograms);
};

function showProgChart(programs) {
    // Hämta canvas-elementet
    const progChart = document.getElementById('programs');

    // Göra arrayer att använda i chart
    const progName = programs.map((item) => {
        return item.name;
    });
    const progApplicants = programs.map((item) => {
        return item.applicantsTotal
    });

    // Göra ett nytt Chart
    new Chart(progChart, {
        type: 'pie',
        data: {
          labels: progName,
          datasets: [{
            label: 'Totalt antal sökande',
            data: progApplicants,
            backgroundColor: [
                'rgba(62, 187, 170, 0.4)',
                'rgba(225,152,154, 0.6)',
                'rgba(150,24,51, 0.5)',
                'rgba(0,137,216, 0.2)',
                'rgba(0,44,34, 0.5)'
            ],
            borderWidth: 1
          }]
        },
        
      });
};