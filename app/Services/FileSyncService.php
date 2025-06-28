<?php

namespace App\Services;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;


class FileSyncService
{
    protected $sourceDir;
    protected $destinationDir;

    /**
     * @param $sourceDir
     * @param $destinationDir
     */
    public function __construct($sourceDir, $destinationDir)
    {
        $this->sourceDir = $sourceDir;
        $this->destinationDir = $destinationDir;

    }
    public function syncFiles()
    {
        if (!File::exists($this->sourceDir)) {
            Log::warning("Répertoire source introuvable : {$this->sourceDir}");
            return;
        }

        if (!File::exists($this->destinationDir)) {
            File::makeDirectory($this->destinationDir, 0755, true);
        }

        $cacheKey = 'file_sync_' . md5($this->sourceDir);
        $lastSync = Cache::get($cacheKey, []);

        $currentFiles = $this->getFileHashes($this->sourceDir);
        $newOrModifiedFiles = array_diff_assoc($currentFiles, $lastSync);

        foreach ($newOrModifiedFiles as $filePath => $hash) {
            $this->copyFile($filePath);
        }

        // Mettre à jour le cache
        Cache::put($cacheKey, $currentFiles, now()->addDays(7));

        if (count($newOrModifiedFiles) > 0) {
            Log::info("Synchronisation terminée : " . count($newOrModifiedFiles) . " fichier(s) copié(s)");
        }
    }

    private function copyFile($filePath)
    {
        try {
            $relativePath = str_replace($this->sourceDir . DIRECTORY_SEPARATOR, '', $filePath);
            $destinationPath = $this->destinationDir . DIRECTORY_SEPARATOR . $relativePath;

            $destinationDir = dirname($destinationPath);
            if (!File::exists($destinationDir)) {
                File::makeDirectory($destinationDir, 0755, true);
            }

            File::copy($filePath, $destinationPath);
            Log::info("Fichier synchronisé : {$relativePath}");

        } catch (\Exception $e) {
            Log::error("Erreur lors de la copie de {$filePath} : " . $e->getMessage());
        }
    }

    private function getFileHashes($directory)
    {
        $files = [];
        $allFiles = File::allFiles($directory);

        foreach ($allFiles as $file) {
            $files[$file->getPathname()] = md5_file($file->getPathname());
        }

        return $files;
    }


}
