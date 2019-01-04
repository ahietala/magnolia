import info.magnolia.importexport.DataTransporter


outputDirectory = '/Users/ahietala/Downloads/TEST/';

session = ctx.getJCRSession("dam")
root = session.getNode("/tours/");
children = root.nodes;
children.each {
    xmlFileOutput = new FileOutputStream(outputDirectory + it.name + ".xml")
    DataTransporter.executeExport(xmlFileOutput, false, false, session, it.getPath(), "dam", DataTransporter.XML)
    xmlFileOutput.close()

}
