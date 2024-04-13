<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
  public function index() {
    $academicYears = DB::select(
      "
      SELECT ay.*, ay.status AS academic_year_status, e.level, e.tuition_plan, e.status AS enrollment_status, e.section, e.enrolled_at, e.payment_receipt_url
      FROM academic_years ay
      LEFT JOIN enrollments e ON ay.id = e.academic_year_id
      ORDER BY ay.start_at DESC
      LIMIT 25
      "
    );

    return Inertia::render('Dashboard', ['academicYears' => $academicYears]);
  }

  public function adminIndex(): Response {
    $academicYears = DB::select(
      "
      SELECT ay.*, COUNT(e.id) AS student_count
      FROM academic_years ay
      LEFT JOIN enrollments e ON ay.id = e.academic_year_id
      GROUP BY ay.id, ay.year, ay.start_at, ay.end_at, ay.status
      ORDER BY ay.start_at DESC
      LIMIT 25
      "
    );

    return Inertia::render('Admin/Dashboard', [
        'academicYears' => $academicYears
    ]);
  }
}
