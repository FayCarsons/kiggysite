#!/usr/bin/env bb

(require '[babashka.fs :as fs]
         '[babashka.cli :refer [parse-opts]]
         '[clojure.string :as s]
         '[clojure.java.shell :refer [sh]])

(def cli-opts
  {:input {:desc "Input directory"
           :required true}
   :output {:desc "Output directory"
            :required true}
   :clear {:desc "Clear target directory before writing converted images"
            :required false
            :default false}
   :alias {:input :i
           :output :o
           :clear :c}
   :coerce {:clear boolean}})

(parse-opts ["--input" "./sdf/afgga/g" "-o" "./bingus.txt" "-s" "50"] cli-opts)

(def args (parse-opts *command-line-args* {:spec cli-opts}))
(def src-dir (:i args))
(def out-dir (:o args))

; Delete all files within the target directory if it exists, otherwise create it
(if (and (fs/exists? out-dir)
         (:c args))
  (doseq [file (fs/list-dir out-dir)]
    (fs/delete-if-exists file))
  (when-not (fs/exists? out-dir)
    (fs/create-dir out-dir)))

(def dir-contents (remove #(clojure.string/includes? % ".DS_Store")
                          (map fs/file-name 
                               (fs/list-dir src-dir))))

(defn shrink! [path scale-expr out-path]
  (println (sh "ffmpeg" "-i"
               path "-vf"
               scale-expr
               out-path
               :dir src-dir)))

(defn split-path [path]
  (let [full (s/replace path #"\s" "")
        wo-extension (first (s/split full #"\."))]
    [full wo-extension]))

(doseq [path dir-contents]
  (let [scale-expr (fn [scale]
                     (str "scale=iw*" scale "/100:ih*" scale "/100"))
        [_ wo-extension] (split-path path)
        med-scale (scale-expr 90)
        thumb-scale (scale-expr 10)
        med-out (str out-dir "/" wo-extension "_medium.avif")
        thumb-out (str out-dir "/" wo-extension "_thumbnail.avif")]
    (println (sh "ffmpeg" "-i" (str src-dir "/" path) "-compression_level" "0" (str out-dir "/" wo-extension ".avif")))
    (shrink! path med-scale med-out)
    (shrink! path thumb-scale thumb-out)))