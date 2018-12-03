/**
 * Created by lipeng on 2018/7/28.
 */
function matrixRotation(matrix, times, rows, columns) {
  let matrixToBeRotated = matrix

  // init tmpMatrix
  let tmpMatrix = new Array(rows)
  for (let j = 0; j !== rows; j++) {
    tmpMatrix[j] = new Array(columns)
  }

  for (let i = 0; i !== times; i++) {
    // rotate
    if (rows <= columns) { // columns is bigger
      const rowBorder = rows / 2
      for (let rowIndex = 0; rowIndex !== rows; rowIndex++) {
        for (let columnIndex = 0; columnIndex !== columns; columnIndex++) {
          if (rowIndex < rowBorder) { // top half area
            // go left or down or up
            if (columnIndex <= rowIndex) {
              // go down
              tmpMatrix[rowIndex + 1][columnIndex] = matrixToBeRotated[rowIndex][columnIndex]
            } else if ( columnIndex + rowIndex <= columns - 1) {
              // go left
              tmpMatrix[rowIndex][columnIndex - 1] = matrixToBeRotated[rowIndex][columnIndex]
            } else {
              // go up
              tmpMatrix[rowIndex - 1][columnIndex] = matrixToBeRotated[rowIndex][columnIndex]
            }
          } else { // bottom half area
            // go right or down or up
            const rowToBottomGap = rows - 1 - rowIndex
            if (columnIndex < rowToBottomGap) {
              // go down
              tmpMatrix[rowIndex + 1][columnIndex] = matrixToBeRotated[rowIndex][columnIndex]
            } else if (columnIndex < columns - 1 - rowToBottomGap) {
              // go right
              tmpMatrix[rowIndex][columnIndex + 1] = matrixToBeRotated[rowIndex][columnIndex]
            } else {
              // go up
              tmpMatrix[rowIndex - 1][columnIndex] = matrixToBeRotated[rowIndex][columnIndex]
            }

          }
        }
      }
    } else {
      const columnBorder = columns / 2
      for (let rowIndex = 0; rowIndex !== rows; rowIndex++) {
        for (let columnIndex = 0; columnIndex !== columns; columnIndex++) {
          if (columnIndex < columnBorder) { // left half area
            const columnToLeftGap = columnIndex
            if (rowIndex < columnIndex) {
              // go left
              tmpMatrix[rowIndex][columnIndex - 1] = matrixToBeRotated[rowIndex][columnIndex]
            } else if (rowIndex < rows - 1 - columnToLeftGap) {
              // go down
              tmpMatrix[rowIndex + 1][columnIndex] = matrixToBeRotated[rowIndex][columnIndex]
            } else {
              // go right
              tmpMatrix[rowIndex][columnIndex + 1] = matrixToBeRotated[rowIndex][columnIndex]
            }
          } else { // right half area
            // go up or left or right
            const columnToRightGap = columns - 1 - columnIndex
            if (rowIndex <= columnToRightGap) {
              // go left
              tmpMatrix[rowIndex][columnIndex - 1] = matrixToBeRotated[rowIndex][columnIndex]
            } else if (rowIndex <= rows - 1 - columnToRightGap) {
              // go up
              tmpMatrix[rowIndex - 1][columnIndex] = matrixToBeRotated[rowIndex][columnIndex]
            } else {
              // go right
              tmpMatrix[rowIndex][columnIndex + 1] = matrixToBeRotated[rowIndex][columnIndex]
            }
          }
        }
      }
    }

    // one rotate finish, prepare for next rotate
    const oldMatrix = matrixToBeRotated
    matrixToBeRotated = tmpMatrix
    tmpMatrix = oldMatrix
  }

  // print
  matrixToBeRotated.forEach((row) => {
    console.log(row.join(' '))
  })

  return matrixToBeRotated
}

export default matrixRotation



// test2

// test3
const matrixStr3 =
`9718805 60013003 5103628 85388216 21884498 38021292 73470430 31785927
69999937 71783860 10329789 96382322 71055337 30247265 96087879 93754371
79943507 75398396 38446081 34699742 1408833 51189 17741775 53195748
79354991 26629304 86523163 67042516 54688734 54630910 6967117 90198864
84146680 27762534 6331115 5932542 29446517 15654690 92837327 91644840
58623600 69622764 2218936 58592832 49558405 17112485 38615864 32720798
49469904 5270000 32589026 56425665 23544383 90502426 63729346 35319547
20888810 97945481 85669747 88915819 96642353 42430633 47265349 89653362
55349226 10844931 25289229 90786953 22590518 54702481 71197978 50410021
9392211 31297360 27353496 56239301 7071172 61983443 86544343 43779176`
function toMatrix (matrixStr) {
  return matrixStr.split('\n').map((row) => {
    return row.replace(/\s*$/, '').split(' ').map(num => parseInt(num, 10))
  })
}
const matrix3Rotate40TimesOutput =
`93754371 53195748 90198864 91644840 32720798 35319547 89653362 50410021
31785927 25289229 10844931 97945481 5270000 69622764 27762534 43779176
73470430 90786953 42430633 96642353 88915819 85669747 26629304 86544343
38021292 22590518 90502426 67042516 54688734 32589026 75398396 61983443
21884498 54702481 17112485 5932542 29446517 2218936 71783860 7071172
85388216 71197978 15654690 58592832 49558405 6331115 10329789 56239301
5103628 47265349 54630910 56425665 23544383 86523163 96382322 27353496
60013003 63729346 51189 1408833 34699742 38446081 71055337 31297360
9718805 38615864 92837327 6967117 17741775 96087879 30247265 9392211
69999937 79943507 79354991 84146680 58623600 49469904 20888810 55349226`
// console.log(matrixRotation(toMatrix(matrixStr3), 40, 10, 8).toString() == toMatrix(matrix3Rotate40TimesOutput).toString())


// hr-test-case-2
const hrTestCase2 =
  `38950343 46927501 52732087 79096784 99768969 87107645 10655095 46677242 33633183 16379998 27254248 42691669 36996828 39112247 88842074 24498867 24431906 2183515 24518860 8314921 61842591 4075781 78546289 38723163 54296259 58332834 72221222 76060312 73789550 83838565 39249266 60702778 26036952 90167124 27699771
16890510 84763994 62683333 36330960 52963972 67006619 29122446 93405938 99753158 83562860 7054176 92077306 4345791 75012462 89936676 68000196 62575180 35614647 28391955 42040554 30306484 34913710 2884941 53777471 963349 70026715 64164289 79955530 74725282 20357033 38623679 66125006 73439290 30872072 57168246
99414907 74527659 20102991 68221497 15715836 47037040 94668793 38183872 65506647 73462209 53396698 25954898 59140985 32091272 81005196 42056652 74616728 96357248 63835792 67447027 38683492 80044320 8263886 12287085 85600270 20185300 6188842 40727578 56937426 43100133 71397805 74205441 30524204 3263549 65617321
12791945 56974984 19553267 43711417 81809847 38184584 58918402 73754269 19237784 3764818 33621057 29600133 68345843 28601713 84942306 11092771 29557082 87544699 23607103 20201108 55705511 61696137 85170914 10137374 45661875 94851660 37224143 28908570 2724302 48348702 44508728 98771569 76221723 17912741 57904517
8706735 97453699 57047755 43731381 48294456 54391094 98099423 10926264 78273507 23487841 74326637 25392625 15579738 91504754 24148953 23183065 8808037 55422220 2194578 47164195 93810141 84319296 30855604 35426054 48535293 63522577 764127 83936671 11240401 18378950 68935044 90805728 86840745 32682148 9278234
65009421 42441944 35083780 41764933 48542010 84988319 25745337 3740135 57697810 21482385 55038384 29704849 96550594 25374716 46276002 74349120 33685751 71492951 75259269 47698699 61853746 56273236 80848410 30945346 79451758 90076980 82818953 6862713 42603635 34020227 25939062 69666819 37096588 55012614 52505001
75762177 10546334 89597290 29497431 59021632 86900651 39702792 21072044 62079995 57754642 71562357 2273815 28578645 7939247 52825694 55664954 60380224 86457800 42282778 78982370 68479663 78083813 41638747 58991300 36669712 65796279 29423523 34377500 72976303 99717277 23389311 78821178 45460956 4329732 59643645
84321666 86194626 62491641 34285202 14392555 39290 12126244 26454124 26922815 33330680 79455933 10478125 37300277 41637573 51261012 69190192 3819479 45480086 57882634 40513196 69446833 78221446 98552569 65051316 86691725 11304763 91120738 53697639 85633000 88588317 69364683 61161903 19076056 13739959 82803519
33841807 33366533 12483205 76302053 98605911 68562392 34944673 39739191 72825638 87466960 72434531 21627929 5388429 69451246 37698618 94812528 3443661 82044693 98013027 47231792 60277409 60949252 56448839 46225605 75981731 87432480 48216855 90975187 54478649 50981117 56209117 24405786 67978531 24647410 52686070
23243869 3097132 60696192 42515278 22909051 41625048 34961554 17449558 62534378 83337900 29747706 30639539 54646830 88255096 47159363 65907570 93903144 1399516 87422869 7267015 19764438 24380035 10059961 10752972 39106282 15013312 19701899 42837490 96499250 28720802 82882472 77534353 52258178 63581494 87324151
37755625 91346726 34690382 1032465 25564074 39837005 82867258 74939433 10672680 9862449 17779854 59887687 36874462 28865278 6190029 76422675 62042896 34428245 42301094 84161170 68925174 32093600 79078957 46430019 71157668 20310550 56939340 75419884 91764932 84015676 39337774 73274535 9860620 46339150 53568652
55336990 55350739 46542796 39474174 53199594 81146709 81534392 28783468 47255908 57727656 8165819 13446816 71128103 15848500 54011009 12599333 63644237 9772340 25432869 14683063 17965691 85612722 33486691 53775941 92015724 17203398 80570802 77320611 99535960 15370209 63723500 76215634 96898348 25561726 54078615
77626125 17225955 3502408 6230294 45890440 80426701 98863935 36120902 97543984 25419962 82907528 81554238 12750828 69136727 27632013 25549470 17328300 95799755 81169470 19489574 17069254 19541016 87002310 90381267 89211288 43589430 63032667 54531734 74671653 60062711 90617014 88560734 69061170 95822938 63385964
27904950 80510009 11906194 11001213 72834700 7982675 6712459 43958651 82491474 95029102 56442671 62128677 28567949 30813309 50195710 31931780 61990524 2780558 41688759 64879495 18327591 53468499 44740362 23667883 50635116 57737366 45456230 41092665 32064365 16088734 90483634 61762241 14794853 54761946 37751016
6916800 66718961 33941839 23785234 18618791 32792836 91680892 9999605 61162042 84081561 93033496 19271750 44753832 24264830 11419555 63680959 89356321 20732633 42379145 94450630 65030632 15388760 38649547 75942078 29209101 48893183 59890390 96971840 31028061 1312714 50402324 84775311 68185691 12012533 93829018
79615390 62746400 92109555 45101941 61335591 68895313 83921794 6781796 93082789 37853418 53586262 99470136 61975664 42995983 25381115 74109108 51670577 11673865 79276139 27756850 77577467 19319390 36848871 13820636 51904093 76125493 54942002 82749303 22757777 76918850 31300901 49831132 49209530 90804743 1918495
63012775 32526254 38743488 75927905 35549466 22702488 44425201 10621617 15816183 58973982 46641778 76539161 89754035 83171064 29811982 553637 50195617 85570690 63397526 3500645 21707681 4331694 40655128 68131471 99608922 1648704 72501480 83035711 47465250 82435779 23225179 8666688 98634485 4651809 71361633
2716447 24326862 54305299 41254015 23825243 63167325 22727130 78655392 4973828 55390112 28875495 37184119 50895077 88565632 75238148 1526714 67454777 41154226 12322752 97989359 75189696 5200857 13776988 33331317 94054306 80129376 31855821 58770443 11915871 55864506 11254100 77633152 65450803 45404222 88248491
2328139 68833569 84484742 91643453 19155178 22972630 89124861 92191840 37917430 26036236 50605927 17961383 87387637 84624143 51838240 64544198 67385670 94179595 9084225 81057184 83556907 17099263 78653234 5556927 71897925 37487010 19452400 56793626 66658091 12610715 69172447 63154172 77452579 72859638 74406930
24195466 19254443 44363078 13147904 55344681 82390365 81419403 61870543 62144103 38746759 99497737 88813748 26843833 55099909 93812968 83352 67196515 24815879 13337908 25849048 44983993 35122953 35604833 10175640 60106567 58741395 53761820 59923877 64991337 95862345 44087642 15675488 73626867 95299715 29532209`

const hrTestCase2Output =
  `61842591 4075781 78546289 38723163 54296259 58332834 72221222 76060312 73789550 83838565 39249266 60702778 26036952 90167124 27699771 57168246 65617321 57904517 9278234 52505001 59643645 82803519 52686070 87324151 53568652 54078615 63385964 37751016 93829018 1918495 71361633 88248491 74406930 29532209 95299715
8314921 34913710 2884941 53777471 963349 70026715 64164289 79955530 74725282 20357033 38623679 66125006 73439290 30872072 3263549 17912741 32682148 55012614 4329732 13739959 24647410 63581494 46339150 25561726 95822938 54761946 12012533 90804743 4651809 45404222 72859638 77452579 63154172 69172447 73626867
24518860 30306484 8263886 12287085 85600270 20185300 6188842 40727578 56937426 43100133 71397805 74205441 30524204 76221723 86840745 37096588 45460956 19076056 67978531 52258178 9860620 96898348 69061170 14794853 68185691 49209530 98634485 65450803 77633152 11254100 55864506 11915871 58770443 12610715 15675488
2183515 42040554 80044320 10137374 45661875 94851660 37224143 28908570 2724302 48348702 44508728 98771569 90805728 69666819 78821178 61161903 24405786 77534353 73274535 76215634 88560734 61762241 84775311 49831132 8666688 23225179 82435779 47465250 83035711 72501480 1648704 99608922 31855821 66658091 44087642
24431906 28391955 38683492 85170914 48535293 63522577 764127 83936671 11240401 18378950 68935044 25939062 23389311 69364683 56209117 82882472 39337774 63723500 90617014 90483634 50402324 31300901 76918850 22757777 82749303 54942002 76125493 51904093 13820636 36848871 19319390 68131471 80129376 56793626 95862345
24498867 35614647 67447027 61696137 35426054 90076980 82818953 6862713 42603635 34020227 99717277 88588317 50981117 28720802 84015676 15370209 60062711 16088734 1312714 31028061 96971840 59890390 48893183 29209101 75942078 38649547 15388760 65030632 94450630 42379145 77577467 40655128 94054306 19452400 64991337
88842074 62575180 63835792 55705511 30855604 79451758 29423523 34377500 72976303 85633000 54478649 96499250 91764932 99535960 74671653 32064365 41092665 45456230 57737366 50635116 23667883 44740362 53468499 18327591 64879495 41688759 2780558 61990524 31931780 20732633 27756850 4331694 33331317 37487010 59923877
39112247 68000196 96357248 20201108 84319296 30945346 65796279 53697639 90975187 42837490 75419884 77320611 54531734 63032667 43589430 89211288 90381267 87002310 19541016 17069254 19489574 81169470 95799755 17328300 25549470 27632013 69136727 12750828 50195710 89356321 79276139 21707681 13776988 71897925 53761820
36996828 89936676 74616728 23607103 93810141 80848410 36669712 91120738 56939340 80570802 17203398 92015724 53775941 33486691 85612722 17965691 14683063 25432869 9772340 63644237 12599333 54011009 15848500 71128103 13446816 8165819 57727656 81554238 30813309 63680959 11673865 3500645 5200857 5556927 58741395
42691669 75012462 42056652 87544699 47164195 56273236 58991300 11304763 19701899 79078957 32093600 68925174 84161170 42301094 34428245 62042896 76422675 6190029 28865278 36874462 59887687 17779854 9862449 83337900 29747706 30639539 47255908 82907528 28567949 11419555 51670577 63397526 75189696 78653234 60106567
27254248 4345791 81005196 29557082 2194578 61853746 41638747 86691725 48216855 46430019 71157668 20310550 15013312 39106282 10752972 10059961 24380035 19764438 7267015 87422869 1399516 93903144 65907570 47159363 88255096 54646830 10672680 25419962 62128677 24264830 74109108 85570690 97989359 17099263 10175640
16379998 92077306 32091272 11092771 55422220 47698699 78083813 65051316 87432480 75981731 46225605 56448839 60949252 60277409 47231792 98013027 82044693 3443661 94812528 37698618 69451246 5388429 21627929 72434531 87466960 72825638 62534378 97543984 56442671 44753832 25381115 50195617 12322752 83556907 35604833
33633183 7054176 59140985 84942306 8808037 75259269 68479663 98552569 78221446 69446833 40513196 57882634 45480086 3819479 69190192 51261012 41637573 37300277 10478125 79455933 33330680 26922815 26454124 39739191 17449558 74939433 28783468 36120902 95029102 19271750 42995983 553637 41154226 81057184 35122953
46677242 83562860 25954898 28601713 23183065 71492951 78982370 42282778 86457800 60380224 55664954 52825694 7939247 28578645 2273815 71562357 57754642 62079995 21072044 39702792 12126244 34944673 34961554 82867258 81534392 98863935 6712459 43958651 82491474 93033496 61975664 29811982 67454777 9084225 44983993
10655095 99753158 53396698 68345843 24148953 33685751 74349120 46276002 25374716 96550594 29704849 55038384 21482385 57697810 3740135 25745337 84988319 86900651 39290 68562392 41625048 39837005 81146709 80426701 7982675 32792836 91680892 9999605 61162042 84081561 99470136 83171064 1526714 94179595 25849048
87107645 93405938 73462209 29600133 91504754 15579738 25392625 74326637 23487841 78273507 10926264 98099423 54391094 48294456 48542010 59021632 14392555 98605911 22909051 25564074 53199594 45890440 72834700 18618791 61335591 68895313 83921794 6781796 93082789 37853418 53586262 89754035 75238148 67385670 13337908
99768969 29122446 65506647 33621057 3764818 19237784 73754269 58918402 38184584 81809847 43711417 43731381 41764933 29497431 34285202 76302053 42515278 1032465 39474174 6230294 11001213 23785234 45101941 75927905 35549466 22702488 44425201 10621617 15816183 58973982 46641778 76539161 88565632 64544198 24815879
79096784 67006619 38183872 94668793 47037040 15715836 68221497 20102991 19553267 57047755 35083780 89597290 62491641 12483205 60696192 34690382 46542796 3502408 11906194 33941839 92109555 38743488 54305299 41254015 23825243 63167325 22727130 78655392 4973828 55390112 28875495 37184119 50895077 51838240 67196515
52732087 52963972 36330960 62683333 84763994 74527659 56974984 97453699 42441944 10546334 86194626 33366533 3097132 91346726 55350739 17225955 80510009 66718961 62746400 32526254 24326862 68833569 84484742 91643453 19155178 22972630 89124861 92191840 37917430 26036236 50605927 17961383 87387637 84624143 83352
46927501 38950343 16890510 99414907 12791945 8706735 65009421 75762177 84321666 33841807 23243869 37755625 55336990 77626125 27904950 6916800 79615390 63012775 2716447 2328139 24195466 19254443 44363078 13147904 55344681 82390365 81419403 61870543 62144103 38746759 99497737 88813748 26843833 55099909 93812968`

// console.log(matrixRotation(toMatrix(hrTestCase2), 20, 20, 35).toString() == toMatrix(hrTestCase2Output).toString())

