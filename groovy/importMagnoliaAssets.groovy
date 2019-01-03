/*
Imports XML files from local computer and import them to Magnolia DAM.
See also: https://documentation.magnolia-cms.com/display/DOCS60/Importing+and+exporting+JCR+data+for+bootstrapping
*/

import groovy.io.FileType
import info.magnolia.importexport.DataTransporter
import javax.jcr.ImportUUIDBehavior

def list = []

def dir = new File("/Users/ahietala/assets/tours/")
dir.eachFile (FileType.FILES) { file ->
  list << file
}

list.each {
  if (!it.isHidden()) {
      DataTransporter.importFile(it, "dam", "/tours", false, ImportUUIDBehavior.IMPORT_UUID_COLLISION_REPLACE_EXISTING, true, true);
  }
}
