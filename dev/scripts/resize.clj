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

(defn shrink! [path out-path scale]
  (let [cmd (mapv str
                  (vector "magick" "convert"
                          (when scale
                            (str "-resize " scale "% "))
                          src-dir "/" path
                          out-path))]
    (println (apply sh cmd))))

(defn split-path [path]
  (let [full (s/replace path #"\s" "")
        wo-extension (first (s/split full #"\."))]
    [full wo-extension]))

(doseq [path dir-contents]
  (let [[_ wo-extension] (split-path path)
        out (str out-dir "/" wo-extension ".avif")
        med-out (str out-dir "/" wo-extension "_medium.avif")]
    (println (sh "magick" "convert" (str src-dir "/" path) out))
    (println (sh "magick" "convert" "-resize" "50%" (str src-dir "/" path) med-out))))