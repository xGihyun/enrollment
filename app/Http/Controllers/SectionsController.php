<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SectionsController extends Controller
{
  public function getAll() {
    $sections = DB::select(
      "
      SELECT * FROM users
      "
    );

    return $sections;
  }
}
