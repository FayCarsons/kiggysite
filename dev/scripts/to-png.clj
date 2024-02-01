#!/usr/bin/env bb

(require '[babashka.fs :as fs]
         '[babashka.cli :refer [parse-opts]]
         '[clojure.string :as s]
         '[clojure.java.shell :refer [sh]])

(def cli-opts
  {:input {:desc "Input directory"
           :required true}
   :alias {:input :i}})

(def args (parse-opts *command-line-args* {:spec cli-opts}))
(def src-dir (:i args))

(println (str "SRC-DIR" src-dir))

(def input-files
  (remove (fn [s]
            (s/includes? s ".DS_Store"))
          (map fs/file-name (fs/list-dir src-dir))))

(doseq [path input-files]
  (if-not (-> path
              fs/extension
              s/lower-case
              (s/includes? "png"))
    (println (clojure.java.shell/sh "magick" "mogrify"
                                    "-format" "png"
                                    "-quality" "100"
                                    "-define" "png:preserve-iCCP"
                                    (str src-dir "/" path)))
    (println (str "File: " path " is already a png!"))))


