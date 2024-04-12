<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class AcademicYearController extends Controller
{

  public function getAll(): array {
    $academicYears = DB::select(
          "
          SELECT * FROM academic_years
          "
        );

    return $academicYears;
  }

  public function insert(Request $request): void {
    DB::insert(
      "
      INSERT INTO academic_years (year, start_at, end_at)
      VALUES (?, ?, ?)
      ",
      [$request->input('year'), $request->input('start_at'), $request->input('end_at')]);
  }

  public function update(Request $request): void {
    DB::update(
      "
      UPDATE academic_years
      SET
        year = ?,
        start_at = ?,
        end_at = ?,
        status = ?
      WHERE id = ?
      ",
      [$request->input('year'), $request->input('start_at'), $request->input('end_at'), $request->input('status'), $request->input('id')]);
  }
}
