<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class EnrollmentController extends Controller
{
  public function getAll(): JsonResponse {
        $enrollments = DB::select("select * from enrollments");

        return Inertia::render('Enrollments', [
            'enrollments' => $enrollments
        ]);
  }

  public function enroll(): Response {
    info("HELLO WORLD");
    return Inertia::render('Enrollment');
  }

  public function insert(Request $request): void {
    // Insert an enrollment on the database

    $year = $request->input('year');

    DB::insert(
      "
      INSERT INTO enrollments (year, level, tuition_plan, student_id, payment_receipt_url)
      VALUES (?, 'foo', 'a', 1, null)
      ",
      [$year]);
  }
}
