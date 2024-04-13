<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
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
    $openAcademicYear = DB::selectOne("SELECT * FROM academic_years WHERE status = 'open'");

    info("Enroll");

    return Inertia::render('Enrollment/Enrollment');
  }

  public function insert(Request $request): void {
    // Insert an enrollment on the database

    $year = $request->input('year');
    $level = $request->input('level');
    $tuition_plan = $request->input('tuition_plan');
    $student_id = $request->user()->id;
    $payment_receipt_url = $request->file('payment_receipt')->storeAs('payment_receipts', $student_id);
    // $payment_receipt_url = Storage::putFileAs(
    //     'local', $request->file('payment_receipt'), $student_id
    // );

    // $payment_receipt = $request->file('payment_receipt');
    // $payment_receipt_url = Storage::putFileAs('local', $request->file('payment_receipts'), $student_id);

    info("Inserting to enrollments...");

    DB::insert(
      "
      INSERT INTO enrollments (level, tuition_plan, student_id, payment_receipt_url, academic_year_id)
      VALUES (?, ?, ?, ?, 1)
      ",
      [$level, $tuition_plan, $student_id, $payment_receipt_url]);

    info("Successfully inserted.");
  }
}
