import info.magnolia.jcr.util.NodeUtil

session = ctx.getJCRSession('dam')
NodeUtil.collectAllChildren(session.rootNode).each {
     if(it.hasProperty('mgnl:tags')) {
         println "Removing tags for node $it.name ..."
         it.getProperty('mgnl:tags').remove()
     }
     if(it.hasProperty('mgnl:lastTaggedDate')) {
         println "Removing property lastTaggedDate for node $it.name ..."
         it.getProperty('mgnl:lastTaggedDate').remove()
     }
};
session.save()
return 'done'
