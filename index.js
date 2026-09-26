const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const axios = require('axios');

const BOT_TOKEN = process.env.BOT_TOKEN;
const API_KEY = process.env.API_KEY;
const fs = require('fs');
const CACHE_FILE = './cache.json';

// ============================================================
// PASTE YOUR 259 CHALLENGE IDs HERE
// ============================================================
const CHALLENGE_IDS = ["0039211B4C02864F696B85A078F817CD","00AA7B01486CAFCA4447A690EF471882","02225F0447DA270FBD23B6AF5E0D0757","02CCBC724B60A95BD59C6AA6DF4B1B82","043F75B24106A2272D63DCAAFAF06186","05375BAC4414F4098C4748A1247ECD66","061A65F74BAFEDD8DB62D9884158D55C","06B200A0492715218AEE42BB03BCD77F","0788F9CE4D66440BFECFDF98F27F2AB3","0B1D82C54ECC22006D97D5B33C03C541","0B496A2E4D48436535995DA2A7B76B97","0B7260E44F80AE95E79B4C9C1E48903D","0B8EA994411B07F77FC2A99000546362","0BFA3FC44A010C1CACD46FA575007B7A","0C0B66B24974DFF4DB2CF4BE7B67B98A","1224D27548719994DB36399284DC50C4","12A16A214B151A324380FD90BBA89A6A","14756D7E49E3C05C441E068A391A7492","158F86AF40A4136A8413FE83BA316671","15B5D50548715AD9B409F0B3DE73ABF4","164ADE114C4D0B053308E6BB0921F87A","16E9004B437A91C0BD26419300AE0FCE","178C2CA3411F0CD8615237B518F01CAA","18904B064A1104C47BDA5A8ED9E2BA44","1900702744AEBCF8CDC41EB60649D770","197822A34AEFC529E6F3EF8D8DB23FC1","19C74A624FB40030182FCD8D95457FFB","1B6472A245E44A8BF39A3CA9243C462D","1C84777E4A346CB93F279788D4D4AE86","1CDEC6EB40BDAAC43AEB2A9FFE96C6F2","1DE99EFE4BF8C9948F487DA231824A75","1ED307CC40BAE77554C8E6B2DE4419BD","21BDA433468F0416C74CA19CF93D58F1","21D2216F429A99C2D79521B6127D350C","24AF5C1B45097232FE62EA8DB6A95176","2681821A41A4E3575E5E89977BB60F84","270DA02E42697776B5C90AA4D42CB2E8","27EBD3F649723E577121F6820A15E2B3","283A0902453BCB1C0870008DC6BA260C","284BA3D9442F98A1BB530F969D24A87B","28901BF543F1D9CA899675A05433740C","29140C1942AA8508CCEA428A859794BC","2C5482CE4C960D32D3E07F99AE414953","2E0E97A44C892A5E712972949C307923","30CE1B5F4D6A9F32E901DA958F540139","31B6E76148A063C9AD8135BBFB143BFC","32782495435898E3828FCDBBEB67222F","362D93BA48C5C26A534FCCAF69700586","364EC5004965582AB567208329024601","37728BA74D9E71517830C6B6093AA628","37CEEEAE47A2870FB96A1BAE8CBDC05B","38A555B54E48F98EEF7EDDB7B7036975","3998593B4424CA838F965190E89EBE98","39DF92064AA9792FFBF6A9BEA4069BCC","39E9716D41C1B28B807066BBCF029C73","3A8C08C84B7C253742DB1296CF8003DD","3ADDD7C44686188D412686B6C29FCDD5","3B609A7F4690D325DF3E0F995375336A","3B60BC7E4A2A60ED771D679E62EDC085","3CE9EC7F49B457A1102E39987E4FEA1D","3D36DA414F47945F6E9CA4853A1001CA","3EFF9C3A4736A8C04EA01FA8B39FA09F","3F141DDE4584B4E9A1206DABAEE02BEE","3FCF9EF642D55EE8FD01A480191C377B","40762BE84BB0597280630C978E77E048","416A4BB149C044B416EDD8ABAFAB2872","41901B044B42A95D90A638A1A15686D5","41B7369F4C5EC84892056A9C0B2ACAC1","42BC6EE444FBEB75C7BB54B7229365EA","42F6AC704B7A8257AC2A908E5580EC5F","43EC02264E91F157FA486486E6FEA9C2","45AA680849FBAF712F1B84B06F09D3A2","45C85CC749A7FBB94A4F47BB5CDE6F79","45CC105A4CF092AE08F540B6FB8BA0EA","469DF3324F180F17723D33B1056B0699","472E58C44BA2BF286332E7BA71F3E158","4AE069E440833759FAC8CEABB3CB889A","4B083F8945A1C47C5679AC9D0442C860","4B862BC843B33EFB5993FAB49285E8F8","4C7A51E94F7EA095C9B76D8F7206CA47","4DDEB48347C3E32F39156DA2564A9E08","4F581E174FA808D0DF934F97A0FB000F","52A489B44F92800072CA5698842ED231","533753B146F544C7FF0CD0AE15C08A06","54EDF2DA4E8611D000DD14AD021EFA63","5512C1024951D713C924ECA46C9BF246","56B0C97542825AD73DEF6D9DD45952FA","56B5445147553412BBEEDCB92A9F656F","57E20B32495E04E32EFE90AEB93EACE4","5835A413484C2357CF01DBBC0ABAEF7B","58897AC0430DE7DC1B447FBB93784544","5892D9FB43135E3B40A459AF99FECCAF","597352D74CFC813DCA6D5497112CD638","5AD1F7EA491B1B6B1959119784400993","5AD88B1249945FFBD743D6966324CD02","5B2387AB4B23017F6C4479B69D4BB9F7","5B6D6156432A69A52690E8BAD290E628","5C1EEE164D3A235F929D35B190367A0E","5C4066A04C15509D464F33A9A238CF57","5D2174B14D30154A5DD363B5B7AFF976","612E71EE480936A27A9A3B8BA85A225F","636418394F82F59403311C9A4E9EB21D","63798FE64E14E354A3C616B345C0FEA4","63BE1F3840A82C86F31EE1B0976FECC9","641656B4405995C743337388983AE4CB","6A13D65F4E43841935B6F8906C402AC2","6B5123E24251675708CF30AE25E0A3E3","6BA3C7924AF814179BD03AB2B9BB96A5","6CA1B0DC4A4065CB3796B5997FEF2F2A","6CBDBB8748105ADAF5BBF198EAE05E69","6E21A52E4C2E82F413A849A44AFAFA92","70339D944BBDE82ACAE1A08D613134C5","70B9D964453E851E40EFCD9217533CF6","7273AD95460EC57B3C2BDA8525B9E299","72B8503B460EC1AE1A803EB3302EBCFA","73BA4DAF455EE7E31E2CDD91025BA7D9","749E544C48E7526DA8C23CBA7B960076","755903F649CB7F785757D1B11925B61D","769288664476291E75419EA44A791A70","77F5B304437E0650AEB060924756B9A6","786A51A241187EC01F70298B997860F4","78E9BBC240F0A59DFE95DF875D61C93F","78EF07FD4F631C0143B6D1BD6789A403","7920514147F4A48BA136AC8F575FB448","7D6CE8AD468BA2C1E832318DCA81C420","7DEED5AD4335BA62F560F095D8EDA909","7F6B50264EF889B26FC5D7AB7EA03AC4","863E79EA49881C0339401084676B5D92","8688E4D4496E459475EDEBAA6D700A00","89D0069C4F996292D9D6C799A29CD652","8AD31D5445BDD4792A058594A3CB7F90","8C68A23043F63D0B69652C9D2F0BD2F6","8E2E387146561D70F9B88DB0333A010F","90519CE345997FBC1F7471A1FD832A1D","90ECF0154E97EBDDB83843A552BB17E3","924B286840D9EE53AB8D3F8869CA6937","941E7085410365DD5998218930900E68","965FDE1D4EB0A675BE7152B6429EFD06","98C9845044A36459DA205CAA9C9B6B32","9C27125648D06935F4BC7D96C1C7BD7D","9E2EA4274F377B0B48584BBD1CAB147E","9EC5A93F4B5D0A3D13F6CCA999108667","A04A78F747353ABBED98D8981F2E1C92","A12BFBC44CEAF247A0B0EE8139277BA0","A400A61C4E84CA8FE1365F99E5073B5B","A410655742A1BE2078BB7A869402A948","A4152D8F436A88A6D6D98490C137085E","A434EF494E2771406AE1FAA19F084B09","A61B201F4EB0BB3106C6A18BD49CB112","A633EF5546402EABFD1F72AE6A566B72","A781076B4EF6E9F27666FF8F3C3B1876","A83795A1451B61A1D67814A17816B127","A8C8A24E4261BBE91687CE8EA614B97B","A9A6F03F4073B8DDCF113E9ED2556E37","AAA2691742A7D4A336A90EA85348AFE7","AAAA215A4F710BCF0F7F45AC47C81D18","AB3538D24AE7C24DF16C08B62666AB3F","ABB4B7D044CDF260EA28C4993762ED5C","AED5F89B46C7304CF379F582DD651422","AFBA9AD941B92B45C4A103ACD4F57383","B1AF729548E1174514CA7DAD9B49DC6E","B2479B5E40BEE8D431210084981464D9","B4844AEA47AEDAB2A62DBC82C840C198","B5DBC4BC4175772274BDC981D59CE301","B619F5BE43A49D068299C29E2C245222","B61CEF614E6231DC9CE67C8B823A230D","B79530434F270B14D12FD7BDBBB27D76","B935A106455C3420A0D877BD9549CACB","B9A56BAE4597E0859479849ED21125AA","BA7FDDDF42D03D9CBA5E169BAAB42196","BB5EE3D84CA7C37DA29786A04E460A58","BC11B9EB414FFF2D58CEC286DBC30ECC","BEFAE4C34323314C4D9662BBEF0E64B8","C09DBF5F45BEAC1D36C86A88F4F4F822","C12198EF4513C41EABFF228D33D943C6","C1601B6A428D4CF7D666218015A31614","C2335BAF4317F1003B59BEA769104195","C30917F4466E50D377C8F4A374046151","C618EA5F4B9FD94D3C9915B86ACF497D","C645CFC741F190CE86F604A889478ACB","C65FD3684A33275A76D66E98BA07914B","C7AFFD7F4A0329E63731298D05845122","C8A1CF4949D07438B0009BA9EBE121F7","C8C35C3844E538D783A59BB750A1D4BF","C990B72C4043EE1BAA9480A39B8CBFA0","CA207D9145C98F32001CB59A0A996853","CAD44A014CBD3FECDCEB60B2E6E2CD43","CB19D5744E666A9EF8115EBEA775CD5B","CCA29A2F4C4B70AEB92F7E884865C81F","D3825D9F40BCAB263E91078E7636574A","D465CA8A4974F9CEA32AE78775C93B77","D6C19B3E4E53520469614C90DD812AB8","D80268FD47CEEDD80D9B07A4F7B95DD9","D8443B794829F0EE6EDE29A9AECE897D","D8B2AB514524C336036961825D50474D","D974FDFB45CE6C2C0D8FE1A10AD29590","DAB3682E4E8CC8F65727D28D84033F5E","DC7964E14387566694C5AEADF72AF243","DC9399E640FF56B7FB08E9B4A3BD5D5F","E086553B483496ABDB84F983826449F3","E202B1194869820753B62A9BD4483D28","E20EFE97459BD9B96E0D4FB48E1B2B2E","E35785AC46B2DE1B9E3165B3DF6C7E56","E3B487D84D87216998922F9D4D29B33F","E3F9B90A49DAAAF3E2C1E0B0EA204701","E488A75B4737DB3F79EE55986BB01730","E5BE61C242B1CA87F3F572A11D6DC427","E5C533F641A62C7A30BA87B87B7D4B7E","E656BBEA4246CF56A460B48EC6126C5E","E7A262F945F56391E3F5CA8C0875E875","E7A39AAC49D21A148C8AC9812DF49D14","E7F1C4974CBF4E20300799BBC84FB72F","E8BF935B40C7E3E002941EAB63CB43B6","EAE918404AE07841ED71A29FD272C08E","EB99DE75410A97E3502ADAA3C353BEE3","EC8216D04D5EA20ADF954295426612F8","EE63EEAC4CD609435BCCEBB9D4D3E0BC","EEEE1A3344D7CC5C6A3E02BEFEA35218","EF02B0CC4BD7E1570F6D17B982A8EB24","EF057FB74FB3AB96C9A972ACA30C0EBE","EF2A87904BA9261317CF6BB089AF659C","EFC730794DC09EEF0B74FFA86200A329","F0A4B746470D99B167ABFEA46ED479C2","F3463B324E47CDA226D33397F277E5B7","F3B83DE4424C08717810AB85E9FB8824","F41D3DBE445DFE86FA996B8911DDCDB4","F751504C43123227955E09A69C759112","F78A7DED4A2B870CD65E39ACFCDB9EED","F7D49CA64CDD411A37140CADBD2F9CC7","FB5A197647C8D6E82CF90BBFE7785238","FB949E6F432C720D53B992B503D5F0EE","FDF49C8F498574B8B63513BD33CDB39C","FF96FDC14FBEF65E3C4D14B3ADACB6BC","A3F7E92644A399DD188FA397CFAAB587","ABDCA5E84054A745E7E71C9D7F0BF0F4","71D2F5C441FB9AAB983373B23F36B7A6","18149054482E45369DCED1AA2F5B5756","3D48148C49E75B86DFDF8683D8CAAD69","137E0BD04201F08CA73CD1B44B71DB96","3D67638C44CCA46CE7294DBBA1B56980","0FC3185E4BD0004783E69A829E54A4B6","19729943465CC352197D9EB11169DFA8","A392CF3B4B60697877AF0ABBCE9ACE90","A5F7700842A56819FECF7583AE00C3C7","9CABC5E34C51AFB31E6B4EB386A59044","699E2CBC4ADB9605B596178B0895AA19","E912FCEC412DDEB47477A0A03813A4E0","749F940A4CA6D1DC4A1122928947A981","D8AFC997470CB1282D6E479170E87ECF","FAC6EC81493BAAC75C3D4282F198B0D9","BA32303945D91F5ACBA73BBC3A7A27E1","3CC3930D4C89C78D78066893229922A3","1E86B4A340497D0236844AA49C19017B","839AA8AA40BE012751D515B732FDCB66","DA3A5A7A4B79017370E304B5B2E9DE0D","4E8F079F41780856AD290983D637A9E3","5FBB7D6B4A89FF68968E0E9C9C7CA94F","5E65FFDE43BE8568937E2086347EA4CC","7389867245360A8E0434BD96E44A5A85"];

const ZDRIFT_IDS = [
  '08E154C24FF331DB0D17C58C2F57C66E',
  'C33D0C704BC054E7356285ABF11DC53E',
  '45FD60664B8E94371E5C1B90042055B6',
  'DABAE8BD4BA9863411C80E987C159B1C',
  '3CB1D189414D615FC5CFD7AE331C950A',
  '98B5BF084AE5B6EA1FBFE29D81182AA6',
  'AF1A749F4BA0B26417E26DBCCCE2F6E5',
  '25968BB249A7F5EE97C9A9BA7B452336',
  '6CF0B2584658877F255BB9A4E77C4A4D',
  '14E21FDC4B38A0F55A4672AAFA562A23',
  'C5AD78A34A45BD8563C601BD8BACAD6B',
  '4B3340D74472A28598B4D9A697685E21',
  '9FF4CB524E311EFEE66655AC64352DE0',
  'CA57765D4A7AB846E97CF9B1641AD0D7',
  '58B040F84FDC2663A78264835978EEB6',
  'F1471C7240F6FD75F09237B439792C09',
  'B741853F41679057111FF5AFDF1B786A',
  'B731495645D8926C107EAAB80FD20686',
  'C7F7A10547E10AB479084F9D17FF850E',
  '2D633BB34BFA6AAD529783960FB03E5E',
  'C8EB575241867FACEB7E3480D02C6ADA',
  '1250FF0148F3E561C14FA99221966D2B',
  '078E1D7A4C3C79AE4A5C8F8BB4A6C0C7',
  '328B66F1494862DA6BBEFB9D3AB5AEC2',
  '1C07391C4C2209847EFC44AFA8DE4310',
  '16309F1A456332E2E9C266A1BCA94EC1',];

const CHALLENGE_NAMES = {
"15B5D50548715AD9B409F0B3DE73ABF4": { name: "Verting", type: "perm" },
"1DE99EFE4BF8C9948F487DA231824A75": { name: "Intro 1", type: "perm" },
"EAE918404AE07841ED71A29FD272C08E": { name: "Intro 2", type: "perm" },
"CB19D5744E666A9EF8115EBEA775CD5B": { name: "Intro 3", type: "perm" },
"58897AC0430DE7DC1B447FBB93784544": { name: "Intro 4", type: "perm" },
"AAAA215A4F710BCF0F7F45AC47C81D18": { name: "Intro 5", type: "perm" },
"19C74A624FB40030182FCD8D95457FFB": { name: "Intro 6", type: "perm" },
"533753B146F544C7FF0CD0AE15C08A06": { name: "Wall Run", type: "perm" },
"1ED307CC40BAE77554C8E6B2DE4419BD": { name: "Pinch Climb", type: "perm" },
"F7D49CA64CDD411A37140CADBD2F9CC7": { name: "Wall Climb", type: "perm" },
"D8B2AB514524C336036961825D50474D": { name: "Corner Climb", type: "perm" },
"158F86AF40A4136A8413FE83BA316671": { name: "Vehicle Vault", type: "perm" },
"0788F9CE4D66440BFECFDF98F27F2AB3": { name: "Drop and Dive", type: "perm" },
"E5BE61C242B1CA87F3F572A11D6DC427": { name: "Tuck n Weave", type: "perm" },
"B1AF729548E1174514CA7DAD9B49DC6E": { name: "Gantry Jump", type: "perm" },
"0039211B4C02864F696B85A078F817CD": { name: "Jungle Gym", type: "perm" },
"B4844AEA47AEDAB2A62DBC82C840C198": { name: "JG Drop", type: "perm" },
"636418394F82F59403311C9A4E9EB21D": { name: "Spiral Slide", type: "perm" },
"3ADDD7C44686188D412686B6C29FCDD5": { name: "Loopy", type: "perm" },
"A61B201F4EB0BB3106C6A18BD49CB112": { name: "Drop In", type: "perm" },
"3D36DA414F47945F6E9CA4853A1001CA": { name: "Rail Fun", type: "perm" },
"27EBD3F649723E577121F6820A15E2B3": { name: "Jump n Journey", type: "perm" },
"EF057FB74FB3AB96C9A972ACA30C0EBE": { name: "Carve", type: "perm" },
"F0A4B746470D99B167ABFEA46ED479C2": { name: "Little Bowl", type: "perm" },
"F3463B324E47CDA226D33397F277E5B7": { name: "Velodrome", type: "perm" },
"21D2216F429A99C2D79521B6127D350C": { name: "Bubble Bowl", type: "perm" },
"5B2387AB4B23017F6C4479B69D4BB9F7": { name: "Tired Pipes", type: "perm" },
"B9A56BAE4597E0859479849ED21125AA": { name: "Bottom Bowl", type: "perm" },
"6E21A52E4C2E82F413A849A44AFAFA92": { name: "Double Bowl", type: "perm" },
"137E0BD04201F08CA73CD1B44B71DB96": { name: "We Go Up", type: "perm" },
"3D67638C44CCA46CE7294DBBA1B56980": { name: "Crystal hop", type: "perm" },
"0FC3185E4BD0004783E69A829E54A4B6": { name: "Still Lava", type: "perm" },
"19729943465CC352197D9EB11169DFA8": { name: "On the Rails", type: "perm" },
"A392CF3B4B60697877AF0ABBCE9ACE90": { name: "Twenty Tries", type: "perm" },
"A5F7700842A56819FECF7583AE00C3C7": { name: "a'gander", type: "perm" },
"9CABC5E34C51AFB31E6B4EB386A59044": { name: "Mountaineer", type: "perm" },
"699E2CBC4ADB9605B596178B0895AA19": { name: "Serpentine", type: "perm" },
"E912FCEC412DDEB47477A0A03813A4E0": { name: "Cross climbing", type: "perm" },
"749F940A4CA6D1DC4A1122928947A981": { name: "Growth", type: "perm" },
"D8AFC997470CB1282D6E479170E87ECF": { name: "Icy Climb", type: "perm" },
"FAC6EC81493BAAC75C3D4282F198B0D9": { name: "Window hop", type: "perm" },
"BA32303945D91F5ACBA73BBC3A7A27E1": { name: "Paddle hands", type: "perm" },
"3CC3930D4C89C78D78066893229922A3": { name: "Now vert", type: "perm" },
"1E86B4A340497D0236844AA49C19017B": { name: "Carve launch", type: "perm" },
"839AA8AA40BE012751D515B732FDCB66": { name: "Left only", type: "perm" },
"DA3A5A7A4B79017370E304B5B2E9DE0D": { name: "Another wall", type: "perm" },
"39DF92064AA9792FFBF6A9BEA4069BCC": { name: "Wallz", type: "perm" },
"786A51A241187EC01F70298B997860F4": { name: "Up the Ramp", type: "perm" },
"77F5B304437E0650AEB060924756B9A6": { name: "Scramble", type: "perm" },
"362D93BA48C5C26A534FCCAF69700586": { name: "Around the Bend", type: "perm" },
"641656B4405995C743337388983AE4CB": { name: "Trek", type: "perm" },
"9C27125648D06935F4BC7D96C1C7BD7D": { name: "All The Way Up", type: "perm" },
"E202B1194869820753B62A9BD4483D28": { name: "Straight Crack", type: "perm" },
"D465CA8A4974F9CEA32AE78775C93B77": { name: "Long Verting", type: "perm" },
"31B6E76148A063C9AD8135BBFB143BFC": { name: "Horizontal Jumps", type: "perm" },
"9E2EA4274F377B0B48584BBD1CAB147E": { name: "Pinch Climbs", type: "perm" },
"0B7260E44F80AE95E79B4C9C1E48903D": { name: "Overhangs", type: "perm" },
"6BA3C7924AF814179BD03AB2B9BB96A5": { name: "Advanced Climb Final", type: "perm" },
"755903F649CB7F785757D1B11925B61D": { name: "Bouldering", type: "perm" },
"BB5EE3D84CA7C37DA29786A04E460A58": { name: "Ghosted Holds", type: "perm" },
"30CE1B5F4D6A9F32E901DA958F540139": { name: "Red Restart", type: "perm" },
"89D0069C4F996292D9D6C799A29CD652": { name: "Wall Jumpy", type: "perm" },
"BEFAE4C34323314C4D9662BBEF0E64B8": { name: "Grubby Route", type: "perm" },
"C65FD3684A33275A76D66E98BA07914B": { name: "Big Stretch", type: "perm" },
"C990B72C4043EE1BAA9480A39B8CBFA0": { name: "Corner Hook", type: "perm" },
"D8443B794829F0EE6EDE29A9AECE897D": { name: "Left Slab Beginner", type: "perm" },
"164ADE114C4D0B053308E6BB0921F87A": { name: "Left Slab Intermediate", type: "perm" },
"D3825D9F40BCAB263E91078E7636574A": { name: "Left Slab Advanced", type: "perm" },
"EC8216D04D5EA20ADF954295426612F8": { name: "Round Up Beginner", type: "perm" },
"BC11B9EB414FFF2D58CEC286DBC30ECC": { name: "Round Up Intermediate", type: "perm" },
"02CCBC724B60A95BD59C6AA6DF4B1B82": { name: "Round Up Advanced", type: "perm" },
"E086553B483496ABDB84F983826449F3": { name: "Cross Route Advanced", type: "perm" },
"C618EA5F4B9FD94D3C9915B86ACF497D": { name: "Right Corner Advanced", type: "perm" },
"C12198EF4513C41EABFF228D33D943C6": { name: "Right Corner Beginner", type: "perm" },
"0B1D82C54ECC22006D97D5B33C03C541": { name: "Right Corner Intermediate", type: "perm" },
"8AD31D5445BDD4792A058594A3CB7F90": { name: "Explore Mainframe", type: "perm" },
"965FDE1D4EB0A675BE7152B6429EFD06": { name: "To a New District", type: "perm" },
"C1601B6A428D4CF7D666218015A31614": { name: "Trip to the Store", type: "perm" },
"57E20B32495E04E32EFE90AEB93EACE4": { name: "Path to Driftball", type: "perm" },
"283A0902453BCB1C0870008DC6BA260C": { name: "Chips in a Loop", type: "perm" },
"416A4BB149C044B416EDD8ABAFAB2872": { name: "Simple Jaunt", type: "perm" },
"AB3538D24AE7C24DF16C08B62666AB3F": { name: "Geo Jumper", type: "perm" },
"B79530434F270B14D12FD7BDBBB27D76": { name: "First Time Dribbles", type: "perm" },
"2E0E97A44C892A5E712972949C307923": { name: "Whip It", type: "perm" },
"4B862BC843B33EFB5993FAB49285E8F8": { name: "Round the Round", type: "perm" },
"AAA2691742A7D4A336A90EA85348AFE7": { name: "Zig Zag", type: "perm" },
"E3B487D84D87216998922F9D4D29B33F": { name: "Dribble Arches", type: "perm" },
"D974FDFB45CE6C2C0D8FE1A10AD29590": { name: "Target Practice", type: "perm" },
"C2335BAF4317F1003B59BEA769104195": { name: "Dribble Rings", type: "perm" },
"7D6CE8AD468BA2C1E832318DCA81C420": { name: "Bridge Hopper", type: "perm" },
"AFBA9AD941B92B45C4A103ACD4F57383": { name: "The Window", type: "perm" },
"EFC730794DC09EEF0B74FFA86200A329": { name: "Boost Carry", type: "perm" },
"5C4066A04C15509D464F33A9A238CF57": { name: "Path to Complex", type: "perm" },
"E488A75B4737DB3F79EE55986BB01730": { name: "Slidey 1", type: "perm" },
"3998593B4424CA838F965190E89EBE98": { name: "Slidey 2", type: "perm" },
"90ECF0154E97EBDDB83843A552BB17E3": { name: "Back and Forth", type: "perm" },
"A83795A1451B61A1D67814A17816B127": { name: "Look Up", type: "perm" },
"18904B064A1104C47BDA5A8ED9E2BA44": { name: "Rollercoaster", type: "perm" },
"37728BA74D9E71517830C6B6093AA628": { name: "Cliffhanger", type: "perm" },
"E3F9B90A49DAAAF3E2C1E0B0EA204701": { name: "Brake Check", type: "perm" },
"C645CFC741F190CE86F604A889478ACB": { name: "Boppin'", type: "perm" },
"EE63EEAC4CD609435BCCEBB9D4D3E0BC": { name: "Tree Top Tussle", type: "perm" },
"A8C8A24E4261BBE91687CE8EA614B97B": { name: "Top Flight", type: "perm" },
"924B286840D9EE53AB8D3F8869CA6937": { name: "Peripheral", type: "perm" },
"EEEE1A3344D7CC5C6A3E02BEFEA35218": { name: "Elevator", type: "perm" },
"7F6B50264EF889B26FC5D7AB7EA03AC4": { name: "Archetype", type: "perm" },
"8C68A23043F63D0B69652C9D2F0BD2F6": { name: "Speed Vine", type: "perm" },
"EF2A87904BA9261317CF6BB089AF659C": { name: "Watercrawl", type: "perm" },
"CCA29A2F4C4B70AEB92F7E884865C81F": { name: "Grotto", type: "perm" },
"5D2174B14D30154A5DD363B5B7AFF976": { name: "Holepunch", type: "perm" },
"E7A262F945F56391E3F5CA8C0875E875": { name: "Sigil", type: "perm" },
"90519CE345997FBC1F7471A1FD832A1D": { name: "Corner Pocket", type: "perm" },
"FDF49C8F498574B8B63513BD33CDB39C": { name: "Truncated", type: "perm" },
"4C7A51E94F7EA095C9B76D8F7206CA47": { name: "Leafy Leap", type: "perm" },
"B61CEF614E6231DC9CE67C8B823A230D": { name: "Branch Gaps", type: "perm" },
"D80268FD47CEEDD80D9B07A4F7B95DD9": { name: "Flying Squirrel", type: "perm" },
"A04A78F747353ABBED98D8981F2E1C92": { name: "Rake it", type: "perm" },
"270DA02E42697776B5C90AA4D42CB2E8": { name: "Escalation", type: "perm" },
"A400A61C4E84CA8FE1365F99E5073B5B": { name: "Fieldhouse", type: "perm" },
"78E9BBC240F0A59DFE95DF875D61C93F": { name: "Perilous Puzzle", type: "perm" },
"284BA3D9442F98A1BB530F969D24A87B": { name: "Sparks 101", type: "perm" },
"7920514147F4A48BA136AC8F575FB448": { name: "Broken Bolt", type: "perm" },
"EF02B0CC4BD7E1570F6D17B982A8EB24": { name: "Dirt to Tree", type: "perm" },
"A4152D8F436A88A6D6D98490C137085E": { name: "Over the Road", type: "perm" },
"A9A6F03F4073B8DDCF113E9ED2556E37": { name: "Lap Them", type: "perm" },
"4DDEB48347C3E32F39156DA2564A9E08":{name:"KazzmaniaWeek37Easy",type:"kazz_easy"},
"70B9D964453E851E40EFCD9217533CF6":{name:"KazzmaniaWeek37Hard",type:"kazz_hard"},
"EB99DE75410A97E3502ADAA3C353BEE3":{name:"KazzmaniaWeek38Easy",type:"kazz_easy"},
"C30917F4466E50D377C8F4A374046151":{name:"KazzmaniaWeek38Hard",type:"kazz_hard"},
"AED5F89B46C7304CF379F582DD651422":{name:"KazzmaniaWeek39Easy",type:"kazz_easy"},
"24AF5C1B45097232FE62EA8DB6A95176":{name:"KazzmaniaWeek39Hard",type:"kazz_hard"},
"6B5123E24251675708CF30AE25E0A3E3":{name:"WeeklyRace1",type:"weekly_race"},
"E7F1C4974CBF4E20300799BBC84FB72F":{name:"KazzmaniaWeek40Easy",type:"kazz_easy"},
"E5C533F641A62C7A30BA87B87B7D4B7E":{name:"KazzmaniaWeek40Hard",type:"kazz_hard"},
"52A489B44F92800072CA5698842ED231":{name:"KazzmaniaWeek41Easy",type:"kazz_easy"},
"C09DBF5F45BEAC1D36C86A88F4F4F822":{name:"KazzmaniaWeek41Hard",type:"kazz_hard"},
"C8C35C3844E538D783A59BB750A1D4BF":{name:"WeeklyRace2",type:"weekly_race"},
"E656BBEA4246CF56A460B48EC6126C5E":{name:"KazzmaniaWeek42Easy",type:"kazz_easy"},
"769288664476291E75419EA44A791A70":{name:"KazzmaniaWeek42Hard",type:"kazz_hard"},
"56B0C97542825AD73DEF6D9DD45952FA":{name:"WeeklyRace3",type:"weekly_race"},
"56B5445147553412BBEEDCB92A9F656F":{name:"KazzmaniaWeek43Easy",type:"kazz_easy"},
"612E71EE480936A27A9A3B8BA85A225F":{name:"KazzmaniaWeek43Hard",type:"kazz_hard"},
"ABB4B7D044CDF260EA28C4993762ED5C":{name:"WeeklyRace4",type:"weekly_race"},
"78EF07FD4F631C0143B6D1BD6789A403":{name:"WeeklyRace5",type:"weekly_race"},
"A410655742A1BE2078BB7A869402A948":{name:"WeeklyRace6",type:"weekly_race"},
"178C2CA3411F0CD8615237B518F01CAA":{name:"KazzmaniaWeek44Easy",type:"kazz_easy"},
"9EC5A93F4B5D0A3D13F6CCA999108667":{name:"KazzmaniaWeek44Hard",type:"kazz_hard"},
"0C0B66B24974DFF4DB2CF4BE7B67B98A":{name:"KazzmaniaWeek45Easy",type:"kazz_easy"},
"749E544C48E7526DA8C23CBA7B960076":{name:"KazzmaniaWeek45Hard",type:"kazz_hard"},
"05375BAC4414F4098C4748A1247ECD66":{name:"KazzmaniaWeek46Easy",type:"kazz_easy"},
"3B609A7F4690D325DF3E0F995375336A":{name:"KazzmaniaWeek46Hard",type:"kazz_hard"},
"4AE069E440833759FAC8CEABB3CB889A":{name:"WeeklyRace7",type:"weekly_race"},
"7DEED5AD4335BA62F560F095D8EDA909":{name:"KazzmaniaWeek47Easy",type:"kazz_easy"},
"1B6472A245E44A8BF39A3CA9243C462D":{name:"KazzmaniaWeek47Hard",type:"kazz_hard"},
"54EDF2DA4E8611D000DD14AD021EFA63":{name:"WeeklyRace8",type:"weekly_race"},
"DC7964E14387566694C5AEADF72AF243":{name:"WeeklyRace9",type:"weekly_race"},
"28901BF543F1D9CA899675A05433740C":{name:"KazzmaniaWeek48Easy",type:"kazz_easy"},
"CA207D9145C98F32001CB59A0A996853":{name:"KazzmaniaWeek48Hard",type:"kazz_hard"},
"E8BF935B40C7E3E002941EAB63CB43B6":{name:"KazzmaniaWeek49Easy",type:"kazz_easy"},
"3FCF9EF642D55EE8FD01A480191C377B":{name:"KazzmaniaWeek49Hard",type:"kazz_hard"},
"16E9004B437A91C0BD26419300AE0FCE":{name:"WeeklyRace10",type:"weekly_race"},
"863E79EA49881C0339401084676B5D92":{name:"KazzmaniaWeek50Easy",type:"kazz_easy"},
"FB5A197647C8D6E82CF90BBFE7785238":{name:"KazzmaniaWeek50Hard",type:"kazz_hard"},
"43EC02264E91F157FA486486E6FEA9C2":{name:"WeeklyRace11",type:"weekly_race"},
"5AD88B1249945FFBD743D6966324CD02":{name:"KazzmaniaWeek51Easy",type:"kazz_easy"},
"41901B044B42A95D90A638A1A15686D5":{name:"KazzmaniaWeek51Hard",type:"kazz_hard"},
"472E58C44BA2BF286332E7BA71F3E158":{name:"WeeklyRace12",type:"weekly_race"},
"21BDA433468F0416C74CA19CF93D58F1":{name:"KazzmaniaWeek52Easy",type:"kazz_easy"},
"12A16A214B151A324380FD90BBA89A6A":{name:"KazzmaniaWeek52Hard",type:"kazz_hard"},
"0B8EA994411B07F77FC2A99000546362":{name:"WeeklyRace13",type:"weekly_race"},
"E20EFE97459BD9B96E0D4FB48E1B2B2E":{name:"WeeklyRace14",type:"weekly_race"},
"CAD44A014CBD3FECDCEB60B2E6E2CD43":{name:"KazzmaniaWeek53Easy",type:"kazz_easy"},
"197822A34AEFC529E6F3EF8D8DB23FC1":{name:"KazzmaniaWeek53Hard",type:"kazz_hard"},
"42BC6EE444FBEB75C7BB54B7229365EA":{name:"WeeklyRace15",type:"weekly_race"},
"FF96FDC14FBEF65E3C4D14B3ADACB6BC":{name:"KazzmaniaWeek54Easy",type:"kazz_easy"},
"A12BFBC44CEAF247A0B0EE8139277BA0":{name:"KazzmaniaWeek54Hard",type:"kazz_hard"},
"C7AFFD7F4A0329E63731298D05845122":{name:"KazzmaniaWeek55Easy",type:"kazz_easy"},
"45CC105A4CF092AE08F540B6FB8BA0EA":{name:"KazzmaniaWeek55Hard",type:"kazz_hard"},
"45C85CC749A7FBB94A4F47BB5CDE6F79":{name:"WeeklyRace16",type:"weekly_race"},
"1224D27548719994DB36399284DC50C4":{name:"KazzmaniaWeek56Easy",type:"kazz_easy"},
"8E2E387146561D70F9B88DB0333A010F":{name:"KazzmaniaWeek56Hard",type:"kazz_hard"},
"2C5482CE4C960D32D3E07F99AE414953":{name:"WeeklyRace17",type:"weekly_race"},
"4B083F8945A1C47C5679AC9D0442C860":{name:"KazzmaniaWeek57Easy",type:"kazz_easy"},
"6A13D65F4E43841935B6F8906C402AC2":{name:"KazzmaniaWeek57Hard",type:"kazz_hard"},
"32782495435898E3828FCDBBEB67222F":{name:"WeeklyRace18",type:"weekly_race"},
"45AA680849FBAF712F1B84B06F09D3A2":{name:"KazzmaniaWeek58Easy",type:"kazz_easy"},
"70339D944BBDE82ACAE1A08D613134C5":{name:"KazzmaniaWeek58Hard",type:"kazz_hard"},
"5892D9FB43135E3B40A459AF99FECCAF":{name:"WeeklyRace19",type:"weekly_race"},
"1900702744AEBCF8CDC41EB60649D770":{name:"KazzmaniaWeek59Easy",type:"kazz_easy"},
"41B7369F4C5EC84892056A9C0B2ACAC1":{name:"KazzmaniaWeek59Hard",type:"kazz_hard"},
"061A65F74BAFEDD8DB62D9884158D55C":{name:"WeeklyRace20",type:"weekly_race"},
"98C9845044A36459DA205CAA9C9B6B32":{name:"KazzmaniaWeek60Easy",type:"kazz_easy"},
"0BFA3FC44A010C1CACD46FA575007B7A":{name:"KazzmaniaWeek60Hard",type:"kazz_hard"},
"C8A1CF4949D07438B0009BA9EBE121F7":{name:"WeeklyRace21",type:"weekly_race"},
"37CEEEAE47A2870FB96A1BAE8CBDC05B":{name:"KazzmaniaWeek61Easy",type:"kazz_easy"},
"00AA7B01486CAFCA4447A690EF471882":{name:"KazzmaniaWeek61Hard",type:"kazz_hard"},
"BA7FDDDF42D03D9CBA5E169BAAB42196":{name:"WeeklyRace22",type:"weekly_race"},
"B619F5BE43A49D068299C29E2C245222":{name:"KazzmaniaWeek62Easy",type:"kazz_easy"},
"4F581E174FA808D0DF934F97A0FB000F":{name:"KazzmaniaWeek62Hard",type:"kazz_hard"},
"2681821A41A4E3575E5E89977BB60F84":{name:"WeeklyRace23",type:"weekly_race"},
"42F6AC704B7A8257AC2A908E5580EC5F":{name:"KazzmaniaWeek63Easy",type:"kazz_easy"},
"63BE1F3840A82C86F31EE1B0976FECC9":{name:"KazzmaniaWeek63Hard",type:"kazz_hard"},
"3CE9EC7F49B457A1102E39987E4FEA1D":{name:"WeeklyRace24",type:"weekly_race"},
"39E9716D41C1B28B807066BBCF029C73":{name:"KazzmaniaWeek64Easy",type:"kazz_easy"},
"F3B83DE4424C08717810AB85E9FB8824":{name:"KazzmaniaWeek64Hard",type:"kazz_hard"},
"5C1EEE164D3A235F929D35B190367A0E":{name:"WeeklyRace25",type:"weekly_race"},
"3A8C08C84B7C253742DB1296CF8003DD":{name:"KazzmaniaWeek65Easy",type:"kazz_easy"},
"A633EF5546402EABFD1F72AE6A566B72":{name:"KazzmaniaWeek65Hard",type:"kazz_hard"},
"597352D74CFC813DCA6D5497112CD638":{name:"KazzmaniaWeek66Easy",type:"kazz_easy"},
"73BA4DAF455EE7E31E2CDD91025BA7D9":{name:"KazzmaniaWeek66Hard",type:"kazz_hard"},
"F41D3DBE445DFE86FA996B8911DDCDB4":{name:"WeeklyRace27",type:"weekly_race"},
"E35785AC46B2DE1B9E3165B3DF6C7E56":{name:"KazzmaniaWeek67Easy",type:"kazz_easy"},
"02225F0447DA270FBD23B6AF5E0D0757":{name:"KazzmaniaWeek67Hard",type:"kazz_hard"},
"6CBDBB8748105ADAF5BBF198EAE05E69":{name:"WeeklyRace28",type:"weekly_race"},
"A781076B4EF6E9F27666FF8F3C3B1876":{name:"KazzmaniaWeek68Easy",type:"kazz_easy"},
"D6C19B3E4E53520469614C90DD812AB8":{name:"KazzmaniaWeek68Hard",type:"kazz_hard"},
"E7A39AAC49D21A148C8AC9812DF49D14":{name:"WeeklyRace29",type:"weekly_race"},
"043F75B24106A2272D63DCAAFAF06186":{name:"KazzmaniaWeek69Easy",type:"kazz_easy"},
"7273AD95460EC57B3C2BDA8525B9E299":{name:"KazzmaniaWeek69Hard",type:"kazz_hard"},
"1CDEC6EB40BDAAC43AEB2A9FFE96C6F2":{name:"WeeklyRace30",type:"weekly_race"},
"6CA1B0DC4A4065CB3796B5997FEF2F2A":{name:"KazzmaniaWeek70Easy",type:"kazz_easy"},
"5835A413484C2357CF01DBBC0ABAEF7B":{name:"KazzmaniaWeek70Hard",type:"kazz_hard"},
"1C84777E4A346CB93F279788D4D4AE86":{name:"WeeklyRace31",type:"weekly_race"},
"B5DBC4BC4175772274BDC981D59CE301":{name:"KazzmaniaWeek71Easy",type:"kazz_easy"},
"3F141DDE4584B4E9A1206DABAEE02BEE":{name:"KazzmaniaWeek71Hard",type:"kazz_hard"},
"40762BE84BB0597280630C978E77E048":{name:"WeeklyRace32",type:"weekly_race"},
"0B496A2E4D48436535995DA2A7B76B97":{name:"KazzmaniaWeek72Easy",type:"kazz_easy"},
"63798FE64E14E354A3C616B345C0FEA4":{name:"KazzmaniaWeek72Hard",type:"kazz_hard"},
"3B60BC7E4A2A60ED771D679E62EDC085":{name:"WeeklyRace33",type:"weekly_race"},
"3EFF9C3A4736A8C04EA01FA8B39FA09F":{name:"KazzmaniaWeek73Easy",type:"kazz_easy"},
"DC9399E640FF56B7FB08E9B4A3BD5D5F":{name:"KazzmaniaWeek73Hard",type:"kazz_hard"},
"F751504C43123227955E09A69C759112":{name:"WeeklyRace34",type:"weekly_race"},
"A434EF494E2771406AE1FAA19F084B09":{name:"WeeklyRace35",type:"weekly_race"},
"941E7085410365DD5998218930900E68":{name:"KazzmaniaWeek74Easy",type:"kazz_easy"},
"06B200A0492715218AEE42BB03BCD77F":{name:"KazzmaniaWeek74Hard",type:"kazz_hard"},
"5B6D6156432A69A52690E8BAD290E628":{name:"WeeklyRace36",type:"weekly_race"},
"FB949E6F432C720D53B992B503D5F0EE":{name:"KazzmaniaWeek75Easy",type:"kazz_easy"},
"F78A7DED4A2B870CD65E39ACFCDB9EED":{name:"KazzmaniaWeek75Hard",type:"kazz_hard"},
"72B8503B460EC1AE1A803EB3302EBCFA":{name:"WeeklyRace37",type:"weekly_race"},
"38A555B54E48F98EEF7EDDB7B7036975":{name:"KazzmaniaWeek76Easy",type:"kazz_easy"},
"5AD1F7EA491B1B6B1959119784400993":{name:"KazzmaniaWeek76Hard",type:"kazz_hard"},
"B935A106455C3420A0D877BD9549CACB":{name:"WeeklyRace38",type:"weekly_race"},
"8688E4D4496E459475EDEBAA6D700A00":{name:"KazzmaniaWeek77Easy",type:"kazz_easy"},
"29140C1942AA8508CCEA428A859794BC":{name:"KazzmaniaWeek77Hard",type:"kazz_hard"},
"5512C1024951D713C924ECA46C9BF246":{name:"WeeklyRace39",type:"weekly_race"},
"DAB3682E4E8CC8F65727D28D84033F5E":{name:"KazzmaniaWeek78Easy",type:"kazz_easy"},
"469DF3324F180F17723D33B1056B0699":{name:"KazzmaniaWeek78Hard",type:"kazz_hard"},
"B2479B5E40BEE8D431210084981464D9":{name:"WeeklyRace40",type:"weekly_race"},
"364EC5004965582AB567208329024601":{name:"KazzmaniaWeek79Easy",type:"kazz_easy"},
"14756D7E49E3C05C441E068A391A7492":{name:"KazzmaniaWeek79Hard",type:"kazz_hard"},
"A3F7E92644A399DD188FA397CFAAB587":{name:"KazzmaniaWeek82Easy",type:"kazz_easy"},
"ABDCA5E84054A745E7E71C9D7F0BF0F4":{name:"KazzmaniaWeek82Hard",type:"kazz_hard"},
"71D2F5C441FB9AAB983373B23F36B7A6":{name:"WeeklyRace42",type:"weekly_race"},
"18149054482E45369DCED1AA2F5B5756":{name:"WeeklyRace43",type:"weekly_race"},
"3D48148C49E75B86DFDF8683D8CAAD69":{name:"WeeklyRace41",type:"weekly_race"},
"4E8F079F41780856AD290983D637A9E3":{name:"KazzmaniaWeek80Easy",type:"kazz_easy"},
"5FBB7D6B4A89FF68968E0E9C9C7CA94F":{name:"KazzmaniaWeek80Hard",type:"kazz_hard"},
"5E65FFDE43BE8568937E2086347EA4CC":{name:"KazzmaniaWeek81Easy",type:"kazz_easy"},
"7389867245360A8E0434BD96E44A5A85":{name:"KazzmaniaWeek81Hard",type:"kazz_hard"},
};

function getChallengeName(id) {
  return CHALLENGE_NAMES[id]?.name || id;
}

// ============================================================
// SET YOUR ALERT CHANNEL IDs HERE
// ============================================================
const WR_CHANNEL_ID = '1552454751923470348';
const TOP7_CHANNEL_ID = '1552455130069340230';
const PB_CHANNEL_ID = '1553443043653193729';

const POINTS = [
  0,
  1000,980,960,940,921,902,882,864,845,826,
  808,790,772,755,737,720,703,686,669,653,
  637,621,605,589,574,559,544,529,514,500,
  486,472,458,444,431,418,405,392,380,367,
  355,343,331,320,309,298,287,276,265,255,
  245,235,225,216,207,198,189,180,172,163,
  155,147,140,132,125,118,111,104,98,92,
  86,80,74,69,64,59,54,49,45,41,
  37,33,29,26,23,20,17,15,12,10,
  8,7,5,4,3,2,1,0,0,0
];

function getPoints(rank) {
  if (rank < 1 || rank > 100) return 0;
  return POINTS[rank];
}

function formatTime(seconds) {
  if (seconds === null || seconds === undefined) return 'N/A';
  const mins = Math.floor(seconds / 60);
  const secs = (seconds % 60).toFixed(3);
  return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
}

let cache = {};
let previousCache = {};
let playerStats = {};
let lastUpdated = null;

async function fetchChallenge(id) {
  try {
    const res = await axios.post(
      `https://api.oriondrift.net/v1/fleets/global/challenges/${id}/list?limit=100`,
      { user_id: null, friends: [] },
      { headers: { 'X-Api-Key': API_KEY, 'Content-Type': 'application/json' } }
    );
    return res.data;
  } catch (e) {
    console.error(`Failed to fetch challenge ${id}:`, e.message);
    return null;
  }
}

async function checkAlerts(newCache) {
  const wrChannel = client.channels.cache.get(WR_CHANNEL_ID);
  const top7Channel = client.channels.cache.get(TOP7_CHANNEL_ID);
  const pbChannel = client.channels.cache.get(PB_CHANNEL_ID);

  for (const [challengeId, newEntries] of Object.entries(newCache)) {
    const oldEntries = previousCache[challengeId] || [];

    for (const newEntry of newEntries) {
      const oldEntry = oldEntries.find(e => e.user_id === newEntry.user_id || e.username === newEntry.username);

      // WR alert
      if (newEntry.rank === 1) {
        const oldWr = oldEntries.find(e => e.rank === 1);
        const isNewWr = !oldWr || oldWr.username !== newEntry.username || oldWr.record !== newEntry.record;
        if (isNewWr && wrChannel) {
          const embed = new EmbedBuilder()
            .setTitle('New World Record')
            .setColor(0xffd700)
            .setDescription(`**${newEntry.username}** set a new WR on **${getChallengeName(challengeId)}**\nTime: **${formatTime(newEntry.record)}**`)
            .setTimestamp();
          wrChannel.send({ embeds: [embed] }).catch(console.error);
        }
      }

      // Top 7 alert
      if (newEntry.rank >= 2 && newEntry.rank <= 7) {
        const wasAlreadyTop7 = oldEntry && oldEntry.rank <= 7;

        if (!wasAlreadyTop7 && top7Channel) {
          const embed = new EmbedBuilder()
            .setTitle('New Top 7')
            .setColor(0x57f287)
            .setDescription(`**${newEntry.username}** entered the top 7 on **${getChallengeName(challengeId)}**\nRank **#${newEntry.rank}** — Time: **${formatTime(newEntry.record)}**`)
            .setTimestamp();
          top7Channel.send({ embeds: [embed] }).catch(console.error);
        } else if (wasAlreadyTop7 && oldEntry.record !== newEntry.record && top7Channel) {
          const embed = new EmbedBuilder()
            .setTitle('Top 7 Personal Best')
            .setColor(0x1abc9c)
            .setDescription(`**${newEntry.username}** improved their time on **${getChallengeName(challengeId)}**\nRank **#${newEntry.rank}** — **${formatTime(oldEntry.record)}** -> **${formatTime(newEntry.record)}**`)
            .setTimestamp();
          top7Channel.send({ embeds: [embed] }).catch(console.error);
        }
      }

      // PB alert — any rank, only if time actually improved
if (oldEntry && newEntry.record < oldEntry.record && pbChannel) {
  const embed = new EmbedBuilder()
    .setTitle('Personal Best')
    .setColor(0x3498db)
    .setDescription(`**${newEntry.username}** improved on **${getChallengeName(challengeId)}**\nRank **#${newEntry.rank}** — **${formatTime(oldEntry.record)}** -> **${formatTime(newEntry.record)}**`)
    .setTimestamp();
  pbChannel.send({ embeds: [embed] }).catch(console.error);
}

      // New top 100 entry — player wasn't in the cache before
      if (!oldEntry && pbChannel) {
        const embed = new EmbedBuilder()
          .setTitle('New Top 100 Entry')
          .setColor(0x95a5a6)
          .setDescription(`**${newEntry.username}** entered the top 100 on **${getChallengeName(challengeId)}**\nRank **#${newEntry.rank}** — Time: **${formatTime(newEntry.record)}**`)
          .setTimestamp();
        pbChannel.send({ embeds: [embed] }).catch(console.error);
      }
    }
  }
}

async function buildCache() {
  console.log(`Fetching ${CHALLENGE_IDS.length} challenges...`);
  // Load from file if previousCache is empty (first run after restart)
if (Object.keys(previousCache).length === 0 && fs.existsSync(CACHE_FILE)) {
  try {
    previousCache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
    console.log('Loaded previous cache from file.');
  } catch (e) {
    console.error('Failed to load cache file:', e.message);
  }
} else {
  previousCache = { ...cache };
}
cache = {};
  playerStats = {};

  for (let i = 0; i < CHALLENGE_IDS.length; i++) {
    const id = CHALLENGE_IDS[i];
    const data = await fetchChallenge(id);
    if (data && Array.isArray(data.top)) {
      cache[id] = data.top;
    }
    if (i % 10 === 0) console.log(`  ${i + 1}/${CHALLENGE_IDS.length} fetched...`);
    await new Promise(r => setTimeout(r, 300));
  }

  for (const [challengeId, entries] of Object.entries(cache)) {
    entries.forEach(entry => {
      const rank = entry.rank;
      if (rank > 100) return;
      const name = entry.username || 'Unknown';
      const userId = entry.user_id || name;
      if (!playerStats[userId]) {
        playerStats[userId] = {
          name,
          totalPoints: 0,
          wrCount: 0,
          top7Count: 0,
          top100Count: 0,
          ranks: [],
          challenges: []
        };
      }
      playerStats[userId].totalPoints += getPoints(rank);
      playerStats[userId].top100Count++;
      if (rank === 1) playerStats[userId].wrCount++;
      if (rank <= 7) playerStats[userId].top7Count++;
      playerStats[userId].ranks.push(rank);
      playerStats[userId].challenges.push({
        challengeId,
        rank,
        record: entry.record
      });
    });
  }

  if (Object.keys(previousCache).length > 0) {
    await checkAlerts(cache);
  }

  lastUpdated = new Date();
  console.log(`Cache built! ${Object.keys(playerStats).length} players found.`);
try {
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache));
} catch (e) {
  console.error('Failed to save cache file:', e.message);
}
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', async () => {
  console.log(`Logged in as ${client.user.tag}`);
  await buildCache();
  setInterval(buildCache, 10 * 60 * 1000);
});

client.on('interactionCreate', async interaction => {

  if (interaction.isAutocomplete()) {
    const { commandName } = interaction;
    const focused = interaction.options.getFocused().toLowerCase();

    if (commandName === 'stats' || commandName === 'improve' || commandName === '1v1' || commandName === 'summary') {
      const matches = Object.values(playerStats)
        .filter(p => p.name.toLowerCase().includes(focused))
        .sort((a, b) => b.totalPoints - a.totalPoints)
        .slice(0, 25)
        .map(p => ({ name: p.name, value: p.name }));
      return interaction.respond(matches);
    }

    if (commandName === 'challenge') {
      const matches = CHALLENGE_IDS
        .filter(id => getChallengeName(id).toLowerCase().includes(focused) || id.toLowerCase().includes(focused))
        .slice(0, 25)
        .map(id => ({ name: getChallengeName(id), value: id }));
      return interaction.respond(matches);
    }
  }

  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'leaderboard') {
    await interaction.deferReply();
    const page = interaction.options.getInteger('page') || 1;
    const perPage = 30;

    const sorted = Object.values(playerStats).sort((a, b) => b.totalPoints - a.totalPoints);
    const totalPages = Math.ceil(sorted.length / perPage);
    const slice = sorted.slice((page - 1) * perPage, page * perPage);

    if (slice.length === 0) {
      return interaction.editReply('No data yet, try again in a moment.');
    }

    const lines = slice.map((p, i) => {
      const rank = (page - 1) * perPage + i + 1;
      const avgRank = p.ranks.length
        ? (p.ranks.reduce((a, b) => a + b, 0) / p.ranks.length).toFixed(1)
        : 'N/A';
      return `#${rank} **${p.name}** — ${p.totalPoints.toLocaleString()} pts | 1st: ${p.wrCount} | Top7: ${p.top7Count} | Top100: ${p.top100Count} | Avg: ${avgRank}`;
    });

    const embed = new EmbedBuilder()
      .setTitle('Orion Drift Global Leaderboard')
      .setColor(0xf5a623)
      .setDescription(lines.join('\n'))
      .setFooter({ text: `Page ${page}/${totalPages} • Updated: ${lastUpdated?.toLocaleTimeString() || 'N/A'}` });

    interaction.editReply({ embeds: [embed] });
  }

  else if (commandName === 'stats') {
    await interaction.deferReply();
    const name = interaction.options.getString('name').toLowerCase();

    const player = Object.values(playerStats).find(p => p.name.toLowerCase() === name)
      || Object.values(playerStats).find(p => p.name.toLowerCase().includes(name));

    if (!player) {
      return interaction.editReply(`No player found matching **${interaction.options.getString('name')}**.`);
    }

    const sorted = Object.values(playerStats).sort((a, b) => b.totalPoints - a.totalPoints);
    const globalRank = sorted.findIndex(p => p.name === player.name) + 1;

    const avgRank = player.ranks.length
      ? (player.ranks.reduce((a, b) => a + b, 0) / player.ranks.length).toFixed(1)
      : 'N/A';

    const summaryEmbed = new EmbedBuilder()
      .setTitle(player.name.slice(0, 256))
      .setColor(0x5865f2)
      .setDescription([
        `**Global Rank:** #${globalRank}`,
        `**Total Points:** ${player.totalPoints.toLocaleString()}`,
        `**World Records (1st):** ${player.wrCount}`,
        `**Top 100s:** ${player.top100Count}`,
        `**Avg Rank:** ${avgRank}`,
      ].join('\n'))
      .setFooter({ text: `Updated: ${lastUpdated?.toLocaleTimeString() || 'N/A'}` });

    await interaction.editReply({ embeds: [summaryEmbed] });

    // Split challenge list into chunks of 4096 chars and send as follow-up messages
    const challengeLines = player.challenges
      .sort((a, b) => a.rank - b.rank)
      .map(c => `#${c.rank} **${getChallengeName(c.challengeId)}** — ${formatTime(c.record)}`);

    let chunk = '';
    let chunkIndex = 1;
    const totalChunks = Math.ceil(challengeLines.length / 25);

    for (let i = 0; i < challengeLines.length; i++) {
      const line = challengeLines[i] + '\n';
      if ((chunk + line).length > 4096) {
        const followEmbed = new EmbedBuilder()
          .setColor(0x5865f2)
          .setTitle(`Challenge Appearances (${chunkIndex}/${totalChunks})`)
          .setDescription(chunk.trim());
        await interaction.followUp({ embeds: [followEmbed] });
        chunk = '';
        chunkIndex++;
      }
      chunk += line;
    }

    if (chunk.trim().length > 0) {
      const followEmbed = new EmbedBuilder()
        .setColor(0x5865f2)
        .setTitle(totalChunks > 1 ? `Challenge Appearances (${chunkIndex}/${totalChunks})` : 'Challenge Appearances')
        .setDescription(chunk.trim());
      await interaction.followUp({ embeds: [followEmbed] });
    }
  }

  else if (commandName === 'challenge') {
    await interaction.deferReply();
    const id = interaction.options.getString('id').toUpperCase();

    const entries = cache[id];
    if (!entries || entries.length === 0) {
      return interaction.editReply(`No data found for challenge ID \`${id}\`.`);
    }

    const lines = entries.slice(0, 20).map(e => {
      return `#${e.rank} **${e.username}** — ${formatTime(e.record)}`;
    });

    const embed = new EmbedBuilder()
      .setTitle(`Challenge: ${getChallengeName(id)}`)
      .setColor(0x57f287)
      .setDescription(lines.join('\n'))
      .setFooter({ text: `Showing top ${Math.min(entries.length, 20)} of ${entries.length} entries` });

    interaction.editReply({ embeds: [embed] });
  }

  else if (commandName === 'top7leaderboard') {
    await interaction.deferReply();
    const page = interaction.options.getInteger('page') || 1;
    const perPage = 30;

    const sorted = Object.values(playerStats).sort((a, b) => b.top7Count - a.top7Count);
    const totalPages = Math.ceil(sorted.length / perPage);
    const slice = sorted.slice((page - 1) * perPage, page * perPage);

    if (slice.length === 0) {
      return interaction.editReply('No data yet, try again in a moment.');
    }

    const lines = slice.map((p, i) => {
      const rank = (page - 1) * perPage + i + 1;
      return `#${rank} **${p.name}** — Top7: ${p.top7Count} | 1st: ${p.wrCount} | Top100: ${p.top100Count}`;
    });

    const embed = new EmbedBuilder()
      .setTitle('Orion Drift — Top 7 Leaderboard')
      .setColor(0xe91e63)
      .setDescription(lines.join('\n'))
      .setFooter({ text: `Page ${page}/${totalPages} • Updated: ${lastUpdated?.toLocaleTimeString() || 'N/A'}` });

    interaction.editReply({ embeds: [embed] });
  }

  else if (commandName === 'wrleaderboard') {
    await interaction.deferReply();
    const page = interaction.options.getInteger('page') || 1;
    const perPage = 30;

    const sorted = Object.values(playerStats).sort((a, b) => b.wrCount - a.wrCount);
    const totalPages = Math.ceil(sorted.length / perPage);
    const slice = sorted.slice((page - 1) * perPage, page * perPage);

    if (slice.length === 0) {
      return interaction.editReply('No data yet, try again in a moment.');
    }

    const lines = slice.map((p, i) => {
      const rank = (page - 1) * perPage + i + 1;
      return `#${rank} **${p.name}** — WRs: ${p.wrCount} | Top7: ${p.top7Count} | Top100: ${p.top100Count}`;
    });

    const embed = new EmbedBuilder()
      .setTitle('Orion Drift — World Record Leaderboard')
      .setColor(0xffd700)
      .setDescription(lines.join('\n'))
      .setFooter({ text: `Page ${page}/${totalPages} • Updated: ${lastUpdated?.toLocaleTimeString() || 'N/A'}` });

    interaction.editReply({ embeds: [embed] });
  }

  else if (commandName === 'avg') {
    await interaction.deferReply();
    const page = interaction.options.getInteger('page') || 1;
    const perPage = 30;

    const globalSorted = Object.values(playerStats).sort((a, b) => b.totalPoints - a.totalPoints);
    const top100Players = globalSorted.slice(0, 100);

    const sorted = top100Players
      .filter(p => p.ranks.length > 0)
      .sort((a, b) => {
        const avgA = a.ranks.reduce((x, y) => x + y, 0) / a.ranks.length;
        const avgB = b.ranks.reduce((x, y) => x + y, 0) / b.ranks.length;
        return avgA - avgB;
      });

    const totalPages = Math.ceil(sorted.length / perPage);
    const slice = sorted.slice((page - 1) * perPage, page * perPage);

    if (slice.length === 0) {
      return interaction.editReply('No data yet, try again in a moment.');
    }

    const lines = slice.map((p, i) => {
      const rank = (page - 1) * perPage + i + 1;
      const avg = (p.ranks.reduce((a, b) => a + b, 0) / p.ranks.length).toFixed(1);
      return `#${rank} **${p.name}** — Avg Rank: ${avg} | Top100s: ${p.top100Count}`;
    });

    const embed = new EmbedBuilder()
      .setTitle('Orion Drift — Best Average Rank (Top 100 Players)')
      .setColor(0x9b59b6)
      .setDescription(lines.join('\n'))
      .setFooter({ text: `Page ${page}/${totalPages} • Updated: ${lastUpdated?.toLocaleTimeString() || 'N/A'}` });

    interaction.editReply({ embeds: [embed] });
  }

  else if (commandName === 'improve') {
    await interaction.deferReply();
    const name = interaction.options.getString('name').toLowerCase();

    const player = Object.values(playerStats).find(p => p.name.toLowerCase() === name)
      || Object.values(playerStats).find(p => p.name.toLowerCase().includes(name));

    if (!player) {
      return interaction.editReply(`No player found matching **${interaction.options.getString('name')}**.`);
    }

    const playerChallengeIds = new Set(player.challenges.map(c => c.challengeId));
    const missing = CHALLENGE_IDS.filter(id => !playerChallengeIds.has(id));

    if (missing.length === 0) {
      return interaction.editReply(`**${player.name}** has a top 100 entry on every challenge!`);
    }

    const lines = missing.map(id => `- **${getChallengeName(id)}**`);

    const description = [
      `**${player.name}** has no top 100 entry on ${missing.length} challenge${missing.length === 1 ? '' : 's'}:`,
      ``,
      lines.join('\n'),
    ].join('\n');

    const embed = new EmbedBuilder()
      .setTitle(`${player.name} — Challenges to Improve`)
      .setColor(0xe67e22)
      .setDescription(description.slice(0, 4096))
      .setFooter({ text: `Updated: ${lastUpdated?.toLocaleTimeString() || 'N/A'}` });

    return interaction.editReply({ embeds: [embed] });
  }

  else if (commandName === '1v1') {
    await interaction.deferReply();

    const name1 = interaction.options.getString('player1').toLowerCase();
    const name2 = interaction.options.getString('player2').toLowerCase();

    const p1 = Object.values(playerStats).find(p => p.name.toLowerCase() === name1)
      || Object.values(playerStats).find(p => p.name.toLowerCase().includes(name1));
    const p2 = Object.values(playerStats).find(p => p.name.toLowerCase() === name2)
      || Object.values(playerStats).find(p => p.name.toLowerCase().includes(name2));

    if (!p1) return interaction.editReply(`No player found matching **${interaction.options.getString('player1')}**.`);
    if (!p2) return interaction.editReply(`No player found matching **${interaction.options.getString('player2')}**.`);
    if (p1.name === p2.name) return interaction.editReply(`You can't 1v1 yourself.`);

    const globalSorted = Object.values(playerStats).sort((a, b) => b.totalPoints - a.totalPoints);
    const rank1 = globalSorted.findIndex(p => p.name === p1.name) + 1;
    const rank2 = globalSorted.findIndex(p => p.name === p2.name) + 1;

    const avg1 = p1.ranks.length ? (p1.ranks.reduce((a, b) => a + b, 0) / p1.ranks.length) : 999;
    const avg2 = p2.ranks.length ? (p2.ranks.reduce((a, b) => a + b, 0) / p2.ranks.length) : 999;

    const p1Challenges = new Map(p1.challenges.map(c => [c.challengeId, c]));
    const p2Challenges = new Map(p2.challenges.map(c => [c.challengeId, c]));

    const sharedIds = [...p1Challenges.keys()].filter(id => p2Challenges.has(id));
    let p1Wins = 0, p2Wins = 0, ties = 0;

    for (const id of sharedIds) {
      const r1 = p1Challenges.get(id).rank;
      const r2 = p2Challenges.get(id).rank;
      if (r1 < r2) p1Wins++;
      else if (r2 < r1) p2Wins++;
      else ties++;
    }

    let p1Score = 0, p2Score = 0;

    if (rank1 < rank2) p1Score++; else if (rank2 < rank1) p2Score++;
    if (p1.totalPoints > p2.totalPoints) p1Score++; else if (p2.totalPoints > p1.totalPoints) p2Score++;
    if (p1.wrCount > p2.wrCount) p1Score++; else if (p2.wrCount > p1.wrCount) p2Score++;
    if (p1.top7Count > p2.top7Count) p1Score++; else if (p2.top7Count > p1.top7Count) p2Score++;
    if (p1.top100Count > p2.top100Count) p1Score++; else if (p2.top100Count > p1.top100Count) p2Score++;
    if (avg1 < avg2) p1Score++; else if (avg2 < avg1) p2Score++;
    if (p1Wins > p2Wins) p1Score++; else if (p2Wins > p1Wins) p2Score++;

    const winner = p1Score > p2Score ? p1.name : p2Score > p1Score ? p2.name : null;
    const verdict = winner
      ? `**${winner}** wins the 1v1 (${Math.max(p1Score, p2Score)}-${Math.min(p1Score, p2Score)})`
      : `Dead even — this 1v1 is a tie`;

    const description = [
      `**Global Rank:** ${p1.name} #${rank1} vs ${p2.name} #${rank2}`,
      `**Total Points:** ${p1.totalPoints.toLocaleString()} vs ${p2.totalPoints.toLocaleString()}`,
      `**World Records:** ${p1.wrCount} vs ${p2.wrCount}`,
      `**Top 7s:** ${p1.top7Count} vs ${p2.top7Count}`,
      `**Top 100s:** ${p1.top100Count} vs ${p2.top100Count}`,
      `**Avg Rank:** ${avg1.toFixed(1)} vs ${avg2.toFixed(1)}`,
      `**Head to Head (${sharedIds.length} shared challenges):** ${p1.name} ${p1Wins} — ${p2Wins} ${p2.name}${ties > 0 ? ` (${ties} tied)` : ''}`,
      ``,
      `**Verdict:** ${verdict}`,
    ].join('\n');

    const embed = new EmbedBuilder()
      .setTitle(`1v1: ${p1.name} vs ${p2.name}`)
      .setColor(winner === p1.name ? 0x5865f2 : winner === p2.name ? 0xe74c3c : 0x95a5a6)
      .setDescription(description)
      .setFooter({ text: `Updated: ${lastUpdated?.toLocaleTimeString() || 'N/A'}` });

    return interaction.editReply({ embeds: [embed] });
  }
});
else if (commandName === 'zdriftleaderboard') {
    await interaction.deferReply();
    const page = interaction.options.getInteger('page') || 1;
    const perPage = 30;

    // Build a leaderboard only from ZDRIFT_IDS
    const zdriftStats = {};

    for (const id of ZDRIFT_IDS) {
      const entries = cache[id];
      if (!entries) continue;
      entries.forEach(entry => {
        const rank = entry.rank;
        if (rank > 100) return;
        const name = entry.username || 'Unknown';
        const userId = entry.user_id || name;
        if (!zdriftStats[userId]) {
          zdriftStats[userId] = {
            name,
            totalPoints: 0,
            wrCount: 0,
            top7Count: 0,
            top100Count: 0,
            ranks: [],
          };
        }
        zdriftStats[userId].totalPoints += getPoints(rank);
        zdriftStats[userId].top100Count++;
        if (rank === 1) zdriftStats[userId].wrCount++;
        if (rank <= 7) zdriftStats[userId].top7Count++;
        zdriftStats[userId].ranks.push(rank);
      });
    }

    const sorted = Object.values(zdriftStats).sort((a, b) => b.totalPoints - a.totalPoints);
    const totalPages = Math.ceil(sorted.length / perPage);
    const slice = sorted.slice((page - 1) * perPage, page * perPage);

    if (slice.length === 0) {
      return interaction.editReply('No data yet, try again in a moment.');
    }

    const lines = slice.map((p, i) => {
      const rank = (page - 1) * perPage + i + 1;
      const avgRank = p.ranks.length
        ? (p.ranks.reduce((a, b) => a + b, 0) / p.ranks.length).toFixed(1)
        : 'N/A';
      return `#${rank} **${p.name}** — ${p.totalPoints.toLocaleString()} pts | 1st: ${p.wrCount} | Top7: ${p.top7Count} | Top100: ${p.top100Count} | Avg: ${avgRank}`;
    });

    const embed = new EmbedBuilder()
      .setTitle('ZDrift Leaderboard')
      .setColor(0x2ecc71)
      .setDescription(lines.join('\n'))
      .setFooter({ text: `Page ${page}/${totalPages} • Updated: ${lastUpdated?.toLocaleTimeString() || 'N/A'}` });

    interaction.editReply({ embeds: [embed] });
  }
client.login(BOT_TOKEN);
