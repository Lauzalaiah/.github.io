"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles, Copy, Check, MessageSquare, User, Lightbulb, Send, TrendingUp, RefreshCw } from "lucide-react"

const GENERATION_TYPES = [
  { id: "welcome", label: "Message de bienvenue", icon: MessageSquare, description: "Accueillez vos nouveaux abonnés" },
  { id: "profile", label: "Description de profil", icon: User, description: "Bio optimisée pour convertir" },
  { id: "content", label: "Idées de contenu", icon: Lightbulb, description: "Ne soyez jamais à court d'inspiration" },
  { id: "reply", label: "Réponse aux messages", icon: Send, description: "Réponses engageantes pour la messagerie" },
  { id: "marketing", label: "Stratégie marketing", icon: TrendingUp, description: "Promouvoir efficacement vos créateurs" },
]

const NICHES = [
  "Fitness",
  "Lifestyle",
  "Cosplay",
  "Art & Créatif",
  "Gaming",
  "Mode & Beauté",
  "Voyage",
  "Musique",
  "Cuisine",
  "Autre",
]

const TONES = [
  { id: "sexy", label: "Séduisant" },
  { id: "friendly", label: "Amical" },
  { id: "professional", label: "Professionnel" },
  { id: "playful", label: "Joueur" },
  { id: "mysterious", label: "Mystérieux" },
]

// Templates de génération prédéfinis
const TEMPLATES: Record<string, Record<string, string[]>> = {
  welcome: {
    sexy: [
      "Hey toi... 💋 Bienvenue dans mon univers privé. Je suis tellement contente que tu aies décidé de me rejoindre. Ici, c'est notre petit secret, un espace où je partage tout ce que je ne peux pas montrer ailleurs. Prépare-toi à découvrir un côté de moi que peu de gens connaissent... 🔥",
      "Coucou nouveau membre VIP ! 😏 Tu viens de prendre la meilleure décision de ta journée. J'ai hâte de te montrer tout ce que j'ai préparé rien que pour toi. N'hésite pas à m'écrire, j'adore faire connaissance avec mes abonnés les plus spéciaux... 💕",
      "Bienvenue dans mon monde secret ! 🖤 Je suis ravie de t'accueillir parmi mes abonnés privilégiés. Ici, pas de filtre, pas de limites... juste toi et moi. Écris-moi pour me dire ce qui t'a attiré, j'adore savoir ce qui vous plaît... 😈",
    ],
    friendly: [
      "Hey ! 🎉 Bienvenue dans la famille ! Je suis super contente de te voir ici. N'hésite pas à me poser des questions ou à me dire ce que tu aimerais voir. Mon objectif c'est de créer du contenu qui te plaît vraiment. À très vite ! 💫",
      "Salut et bienvenue ! 😊 Merci d'avoir rejoint ma communauté, ça me fait vraiment plaisir. Ici on est entre nous, dans une ambiance détendue. Dis-moi un peu de toi, j'aime connaître les personnes qui me suivent ! 🌟",
      "Coucou toi ! 👋 Bienvenue dans mon petit coin de paradis. Je suis trop heureuse que tu sois là ! Si tu as des envies particulières ou des questions, ma messagerie est toujours ouverte. Hâte de partager plein de moments avec toi ! 💝",
    ],
    professional: [
      "Bienvenue parmi mes abonnés premium ! Je vous remercie pour votre confiance. Vous avez désormais accès à l'ensemble de mon contenu exclusif. N'hésitez pas à me contacter si vous avez des questions. Je publie régulièrement du nouveau contenu. Bonne découverte !",
      "Merci pour votre abonnement ! Vous faites maintenant partie de ma communauté privilégiée. Vous trouverez ici du contenu exclusif mis à jour plusieurs fois par semaine. Pour toute demande personnalisée, n'hésitez pas à m'écrire. Bienvenue !",
      "Je vous souhaite la bienvenue ! Votre abonnement vous donne accès à tout mon contenu premium. Je m'engage à vous proposer du contenu de qualité régulièrement. Ma messagerie est ouverte pour vos questions et suggestions. Merci de votre soutien !",
    ],
    playful: [
      "Yooo ! 🎮 T'as trouvé le level secret ! Bienvenue dans la zone VIP où ça devient vraiment intéressant 😜 J'espère que t'es prêt(e) parce qu'ici on s'amuse bien ! Envoie-moi un petit message pour qu'on fasse connaissance ! 🚀",
      "Boom ! 💥 Te voilà dans le club ! Bienvenue dans mon univers de folie. Ici c'est fun, c'est cool, et surtout c'est notre petit secret ! T'es prêt(e) pour l'aventure ? Let's gooo ! 🎉",
      "Tadaaa ! ✨ Bienvenue dans les coulisses ! Tu viens de débloquer l'accès VIP, félicitations ! Ici on rigole, on partage et on passe du bon temps. Viens me dire coucou en message ! 🌈",
    ],
    mysterious: [
      "Tu as franchi le seuil... 🖤 Bienvenue dans mon sanctuaire secret. Peu de gens ont accès à ce que je m'apprête à te révéler. Es-tu prêt(e) à découvrir mes mystères ? Le voyage ne fait que commencer... 🌙",
      "Les portes se sont ouvertes pour toi... ✨ Bienvenue dans l'ombre où je me dévoile. Ici, chaque secret a sa place. Approche-toi, et découvre ce que je cache au monde... 🔮",
      "Bienvenue, voyageur... 🌑 Tu as trouvé l'entrée de mon monde caché. Rares sont ceux qui arrivent jusqu'ici. Ce que tu vas découvrir restera entre nous... Es-tu prêt(e) ? 🗝️",
    ],
  },
  profile: {
    sexy: [
      "🔥 Ton fantasme préféré, en vrai | Contenu exclusif quotidien | DMs ouverts pour mes abonnés VIP 💋 | Rejoins-moi dans les coulisses... tu ne seras pas déçu(e) 😈",
      "💋 Plus qu'une créatrice, une expérience | Contenu sans filtre réservé à mes abonnés | Réponds à tous mes messages | Viens découvrir ce que je ne montre nulle part ailleurs 🔥",
      "😏 Ici, c'est notre secret | Contenu exclusif & personnalisé | Active 24/7 | Ton échappatoire quotidienne commence ici... Es-tu prêt(e) ? 💕",
    ],
    friendly: [
      "✨ Hey ! Moi c'est [NOM] | Créatrice de contenu passionnée | Ici on partage, on rigole et on crée ensemble | Rejoins ma petite famille ! 💫 | DMs toujours ouverts 💬",
      "🌟 Bienvenue chez moi ! | Contenu authentique & bonne humeur | J'adore échanger avec ma communauté | Nouveau contenu chaque jour | Viens, on va bien s'entendre ! 😊",
      "👋 Salut c'est [NOM] ! | Ici c'est mon espace de liberté | Contenu exclusif + behind the scenes | Je réponds à tous vos messages | Rejoignez l'aventure ! 💝",
    ],
    professional: [
      "Créatrice de contenu premium | Nouveau contenu quotidien | Réponse garantie sous 24h | Contenu personnalisé sur demande | Qualité professionnelle | Rejoignez ma communauté exclusive",
      "Contenu exclusif haute qualité | Publications régulières | Service personnalisé pour chaque abonné | Demandes spéciales acceptées | Votre satisfaction est ma priorité",
      "Créatrice vérifiée | Contenu premium exclusif | Interaction quotidienne avec mes abonnés | Demandes personnalisées disponibles | Rejoignez l'expérience",
    ],
    playful: [
      "🎮 Player 2 has entered the game ! | Contenu fun & exclusif | Easter eggs cachés pour les vrais | DMs = zone de délire | Ready to play ? 🚀",
      "🎉 Bienvenue dans le chaos organisé ! | Contenu surprenant chaque jour | Je suis aussi folle que vous | Venez rigoler avec moi ! | Level up your day ! 💥",
      "🌈 100% good vibes here ! | Contenu décalé & authentique | On s'amuse, on partage, on kiffe | DMs = conversation garantie | Join the party ! 🎊",
    ],
    mysterious: [
      "🌙 Certains secrets ne se révèlent qu'aux initiés... | Contenu exclusif | Découvre ce que je cache | Es-tu prêt(e) à voir l'invisible ? 🔮",
      "🖤 Dans l'ombre, je me dévoile... | Contenu réservé aux curieux | Chaque post est une énigme | Ose franchir le seuil... 🗝️",
      "✨ Ce que tu cherches est ici... | Contenu mystérieux & captivant | Peu osent regarder | Seras-tu l'un d'entre eux ? 🌑",
    ],
  },
  content: {
    sexy: [
      "💡 Idées de contenu séduisant :\n\n1. Shooting en lingerie avec jeu de lumières tamisées\n2. Behind the scenes de ta routine beauté (version sensuelle)\n3. Try-on haul de maillots de bain\n4. Contenu \"getting ready\" pour une soirée\n5. Photos en robe de chambre, ambiance cosy et intime\n6. Série \"mes tenues préférées\" avec défilé\n7. Contenu aquatique (piscine, bain moussant)\n8. Shooting artistique en noir et blanc\n9. Contenu \"réveil\" naturel et authentique\n10. Série thématique mensuelle (ex: \"les nuits de janvier\")",
    ],
    friendly: [
      "💡 Idées de contenu engageant :\n\n1. Q&A avec tes abonnés (stories ou posts)\n2. Day in my life (une journée avec toi)\n3. Mes hobbies et passions cachées\n4. Challenges fun avec ta communauté\n5. Unboxing de cadeaux d'abonnés\n6. Behind the scenes de tes shootings\n7. Vlogs quotidiens ou hebdomadaires\n8. Tes playlists et recommandations\n9. Cooking/baking avec tes recettes préférées\n10. Réactions et reviews de contenus",
    ],
    professional: [
      "💡 Stratégie de contenu professionnelle :\n\n1. Contenu quotidien à heure fixe pour créer une habitude\n2. Séries thématiques hebdomadaires pour la fidélisation\n3. Contenu exclusif mensuel pour les abonnés longue durée\n4. Behind the scenes pour humaniser la marque\n5. Contenu saisonnier (fêtes, événements)\n6. Collaborations avec d'autres créateurs\n7. Contenu interactif (sondages, choix)\n8. Teasers pour le contenu premium\n9. Récapitulatifs mensuels des meilleurs contenus\n10. Contenu \"anniversaire d'abonnement\" personnalisé",
    ],
    playful: [
      "💡 Idées de contenu fun :\n\n1. Challenges TikTok version exclusive\n2. Jeux avec tes abonnés (devinettes, quiz)\n3. Cosplay de personnages populaires\n4. Réactions exagérées à des vidéos/memes\n5. \"Essayez de ne pas rire\" avec toi\n6. Bloopers et fails de tes shootings\n7. Imitations de célébrités ou créateurs\n8. Défis lancés par les abonnés\n9. Sketchs et mini-scènes comiques\n10. Transformations surprenantes (avant/après fun)",
    ],
    mysterious: [
      "💡 Idées de contenu mystérieux :\n\n1. Séries à épisodes avec suspense\n2. Contenu révélé progressivement (puzzle)\n3. Photos artistiques avec symbolisme caché\n4. Stories énigmatiques à décoder\n5. Contenu accessible après \"quête\" (engagement)\n6. Esthétique sombre et cinématographique\n7. Personnages et alter-egos\n8. Contenu inspiré de l'ésotérisme/astrologie\n9. Séries \"secrets révélés\" au compte-gouttes\n10. Contenu interactif type \"choose your adventure\"",
    ],
  },
  reply: {
    sexy: [
      "📝 Réponses séduisantes pour la messagerie :\n\n• \"Mmm, j'adore quand tu m'écris comme ça... 😏\"\n• \"Tu sais exactement quoi dire pour me faire sourire... 💋\"\n• \"Si seulement tu savais ce que j'ai prévu pour toi... 🔥\"\n• \"Je pensais justement à toi... quelle coïncidence 😈\"\n• \"Tes messages sont toujours le highlight de ma journée 💕\"\n• \"Continue comme ça et tu vas me rendre accro... 😘\"\n• \"J'ai quelque chose de spécial qui arrive, tu vas adorer... 🖤\"\n• \"Ton message m'a donné des idées... 😏\"\n• \"Tu mérites une récompense pour être aussi fidèle... 💫\"\n• \"Entre nous, t'es mon abonné préféré... chut ! 🤫\"",
    ],
    friendly: [
      "📝 Réponses amicales pour la messagerie :\n\n• \"Hey ! Ça fait trop plaisir de te lire ! 😊\"\n• \"Omg merci tellement, ça me touche vraiment ! 💕\"\n• \"T'es vraiment adorable, tu sais ça ? 🥰\"\n• \"Haha j'adore ton énergie ! 🎉\"\n• \"Attends, c'est trop mignon ce que tu dis ! 💝\"\n• \"Tu me fais trop rire, j'adore ! 😂\"\n• \"Sérieux, mes abonnés sont les meilleurs 🌟\"\n• \"Aww merci ! Tu viens de faire ma journée ! ✨\"\n• \"T'es un amour, vraiment ! 💫\"\n• \"J'ai trop de chance d'avoir des gens comme toi ! 🙏\"",
    ],
    professional: [
      "📝 Réponses professionnelles pour la messagerie :\n\n• \"Merci pour votre message ! Je vous réponds dès que possible.\"\n• \"J'apprécie votre soutien, cela compte beaucoup pour moi.\"\n• \"Votre suggestion est notée, merci pour ce retour constructif.\"\n• \"Je travaille actuellement sur du nouveau contenu qui devrait vous plaire.\"\n• \"Merci pour votre fidélité, c'est grâce à vous que je peux continuer.\"\n• \"Je prends en compte votre demande pour mes prochaines créations.\"\n• \"Votre abonnement me permet de créer du contenu de qualité, merci.\"\n• \"N'hésitez pas si vous avez d'autres questions.\"\n• \"Je vous tiendrai informé(e) des prochaines nouveautés.\"\n• \"Merci pour ce commentaire encourageant, cela me motive énormément.\"",
    ],
    playful: [
      "📝 Réponses joueuses pour la messagerie :\n\n• \"Hahaha t'es vraiment un(e) malade, j'adore ! 😂\"\n• \"Ok celle-là elle était bonne, bien joué ! 🎮\"\n• \"T'as gagné des points bonus pour ça ! 🏆\"\n• \"Attention, je vais finir par croire que t'es mon fan number 1 ! 🥇\"\n• \"Plot twist : moi aussi je suis contente de te voir ! 🎬\"\n• \"Achievement unlocked : faire sourire ta créatrice préférée ! ✨\"\n• \"Ok mais t'as pas le droit d'être aussi cool ! 😎\"\n• \"Je note, je note... t'as du potentiel toi ! 📝\"\n• \"GG bien joué, tu m'as eu ! 🎯\"\n• \"Loading... réponse parfaite en cours de création ! 💫\"",
    ],
    mysterious: [
      "📝 Réponses mystérieuses pour la messagerie :\n\n• \"Intéressant... tu commences à comprendre... 🌙\"\n• \"Patience... tout sera révélé en temps voulu... 🔮\"\n• \"Tu poses les bonnes questions... 🖤\"\n• \"Certains secrets valent la peine d'attendre... ✨\"\n• \"Tu es plus perspicace que les autres... 👁️\"\n• \"Bientôt, tu sauras... 🗝️\"\n• \"Les étoiles sont alignées pour toi... 🌟\"\n• \"Tu as trouvé quelque chose que peu remarquent... 🌑\"\n• \"Continue de chercher... tu approches... 🔍\"\n• \"Ce que tu cherches te trouvera... 🌀\"",
    ],
  },
  marketing: {
    sexy: [
      "📈 Stratégie marketing séduisante :\n\n**Réseaux sociaux :**\n• Teasers suggestifs sur Instagram/Twitter avec lien en bio\n• Stories éphémères créant l'urgence\n• Contenu censuré avec \"voir plus sur Fansly\"\n\n**Engagement :**\n• DMs personnalisés aux followers engagés\n• Récompenses exclusives pour les partages\n• Collaborations avec créateurs complémentaires\n\n**Conversion :**\n• Offres limitées dans le temps\n• Aperçus gratuits du contenu premium\n• Témoignages d'abonnés satisfaits (anonymes)\n\n**Fidélisation :**\n• Contenu surprise pour les abonnés fidèles\n• Réductions pour réabonnement\n• Accès anticipé au nouveau contenu",
    ],
    friendly: [
      "📈 Stratégie marketing amicale :\n\n**Communauté :**\n• Lives réguliers pour créer du lien\n• Q&A et interactions authentiques\n• Groupe Discord/Telegram pour les fans\n\n**Contenu gratuit :**\n• Valeur gratuite sur les réseaux (conseils, entertainment)\n• Behind the scenes accessibles à tous\n• Teasers du contenu premium\n\n**Engagement :**\n• Répondre à tous les commentaires\n• Mentionner et remercier les abonnés\n• Créer des inside jokes avec la communauté\n\n**Croissance :**\n• Collaborations avec créateurs similaires\n• Challenges viraux adaptés à ta niche\n• User generated content (réactions des fans)",
    ],
    professional: [
      "📈 Stratégie marketing professionnelle :\n\n**Acquisition :**\n• Calendrier éditorial structuré\n• SEO optimisé sur tous les profils\n• Publicités ciblées (où autorisé)\n\n**Conversion :**\n• Tunnel de vente clair : gratuit → teaser → premium\n• Landing pages optimisées\n• A/B testing des offres\n\n**Rétention :**\n• Programme de fidélité\n• Contenu exclusif pour anciens abonnés\n• Communication régulière (newsletter)\n\n**Analytics :**\n• Suivi des KPIs (conversion, rétention, LTV)\n• Analyse des meilleurs contenus\n• Optimisation continue basée sur les données",
    ],
    playful: [
      "📈 Stratégie marketing fun :\n\n**Viralité :**\n• Memes et contenu partageable\n• Challenges originaux et décalés\n• Trends TikTok adaptés à ta sauce\n\n**Gamification :**\n• Systèmes de points/récompenses\n• Chasses au trésor sur tes réseaux\n• Concours créatifs pour les abonnés\n\n**Communauté :**\n• Inside jokes et références récurrentes\n• Fan art et créations de la communauté\n• Lives spontanés et chaotiques (controlled chaos)\n\n**Surprise :**\n• Contenus inattendus et imprévisibles\n• Cadeaux random aux abonnés actifs\n• Collaborations surprises",
    ],
    mysterious: [
      "📈 Stratégie marketing mystérieuse :\n\n**Intrigue :**\n• Teasers cryptiques avant chaque contenu\n• Histoires à épisodes avec cliffhangers\n• Indices cachés dans les posts\n\n**Exclusivité :**\n• Accès \"secret\" pour les initiés\n• Contenu débloqué par énigmes\n• Niveaux d'accès progressifs\n\n**Esthétique :**\n• Branding cohérent et reconnaissable\n• Palette de couleurs sombre et élégante\n• Storytelling visuel fort\n\n**Engagement :**\n• ARG (Alternate Reality Game) légers\n• Community building autour des mystères\n• Révélations programmées créant l'anticipation",
    ],
  },
}

export function FanslyAITool() {
  const [generationType, setGenerationType] = useState<string>("welcome")
  const [creatorName, setCreatorName] = useState<string>("")
  const [niche, setNiche] = useState<string>("")
  const [tone, setTone] = useState<string>("friendly")
  const [generatedContent, setGeneratedContent] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)
    
    // Simuler un délai de génération
    setTimeout(() => {
      const templates = TEMPLATES[generationType]?.[tone] || []
      if (templates.length > 0) {
        let content = templates[Math.floor(Math.random() * templates.length)]
        
        // Remplacer les placeholders
        if (creatorName) {
          content = content.replace(/\[NOM\]/g, creatorName)
        }
        if (niche) {
          content = content + `\n\n📌 Niche : ${niche}`
        }
        
        setGeneratedContent(content)
      }
      setIsGenerating(false)
    }, 1500)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleRegenerate = () => {
    handleGenerate()
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-3 rounded-lg border border-primary/30 bg-primary/10 p-4">
        <div className="flex size-12 items-center justify-center rounded-full bg-primary/20">
          <Sparkles className="size-6 text-primary" />
        </div>
        <div>
          <h3 className="font-serif text-lg font-bold text-foreground">Module IA Fansly</h3>
          <p className="font-sans text-sm text-muted-foreground">Logiciel de génération de contenu professionnel</p>
        </div>
      </div>

      {/* Type de génération */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {GENERATION_TYPES.map((type) => {
          const Icon = type.icon
          const isActive = generationType === type.id
          return (
            <button
              key={type.id}
              onClick={() => setGenerationType(type.id)}
              className={`flex cursor-pointer flex-col items-center gap-2 rounded-lg border p-3 transition-all ${
                isActive
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border/40 bg-secondary/30 text-muted-foreground hover:border-border hover:bg-secondary/50"
              }`}
            >
              <Icon className="size-5" />
              <span className="text-center font-sans text-xs font-medium">{type.label}</span>
            </button>
          )
        })}
      </div>

      {/* Options */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex flex-col gap-2">
          <Label htmlFor="creator-name" className="font-sans text-sm font-medium text-foreground">
            Nom du créateur (optionnel)
          </Label>
          <Input
            id="creator-name"
            placeholder="Ex: Luna, Alex..."
            value={creatorName}
            onChange={(e) => setCreatorName(e.target.value)}
            className="border-border/40 bg-secondary/30"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="niche" className="font-sans text-sm font-medium text-foreground">
            Niche
          </Label>
          <Select value={niche} onValueChange={setNiche}>
            <SelectTrigger id="niche" className="border-border/40 bg-secondary/30">
              <SelectValue placeholder="Sélectionnez une niche" />
            </SelectTrigger>
            <SelectContent>
              {NICHES.map((n) => (
                <SelectItem key={n} value={n}>{n}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="tone" className="font-sans text-sm font-medium text-foreground">
            Ton
          </Label>
          <Select value={tone} onValueChange={setTone}>
            <SelectTrigger id="tone" className="border-border/40 bg-secondary/30">
              <SelectValue placeholder="Sélectionnez un ton" />
            </SelectTrigger>
            <SelectContent>
              {TONES.map((t) => (
                <SelectItem key={t.id} value={t.id}>{t.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Bouton de génération */}
      <Button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="w-full gap-2 bg-primary font-sans font-semibold text-primary-foreground hover:bg-primary/90"
        size="lg"
      >
        {isGenerating ? (
          <>
            <RefreshCw className="size-4 animate-spin" />
            Génération en cours...
          </>
        ) : (
          <>
            <Sparkles className="size-4" />
            Générer le contenu
          </>
        )}
      </Button>

      {/* Résultat */}
      {generatedContent && (
        <Card className="border-border/40 bg-card/80">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="font-serif text-base font-bold text-foreground">
                Contenu généré
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRegenerate}
                  disabled={isGenerating}
                  className="gap-1.5 border-border/40 bg-secondary/50 font-sans text-xs"
                >
                  <RefreshCw className={`size-3.5 ${isGenerating ? "animate-spin" : ""}`} />
                  Régénérer
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  className="gap-1.5 border-border/40 bg-secondary/50 font-sans text-xs"
                >
                  {copied ? (
                    <>
                      <Check className="size-3.5 text-green-500" />
                      Copié !
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5" />
                      Copier
                    </>
                  )}
                </Button>
              </div>
            </div>
            <CardDescription className="font-sans text-xs">
              Personnalisez ce contenu selon votre style avant de l{"'"}utiliser
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-wrap rounded-lg border border-border/30 bg-secondary/20 p-4 font-sans text-sm leading-relaxed text-foreground/90">
              {generatedContent}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
