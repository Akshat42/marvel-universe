import {Component, OnInit} from '@angular/core';
import {HeroDataService} from "../../hero-data.service";
import {Hero} from "../../../model/hero";
import {UtilService} from "../../../service/util.service";


@Component({
  selector: 'mu-popular-container',
  templateUrl: './popular-container.component.html',
  styleUrls: ['./popular-container.component.scss']
})
export class PopularContainerComponent implements OnInit {

  heroes!: Hero[];
  upVoteColor: string = "blue";
  defaultColor: string = "none";
  downVoteColor: string = "red";
  utilService = new UtilService();

  constructor(private heroDataService: HeroDataService) {
  }

  ngOnInit(): void {
    this.heroDataService.getPopularHeroes()
      .subscribe(
        heroes => {
          this.heroes = [];
          heroes.forEach((hero: any) => {
            this.heroes.push({
              description: hero.description,
              id: hero.id,
              modified: hero.modified,
              name: hero.name,
              imageUrl: hero.thumbnail.path + "." + hero.thumbnail.extension,
              votes: this.utilService.globalVotes.get(hero.id)
            });
          });
          this.utilService.hideLoader();
        },
        error => console.log(error)
      );
  }

  sort(heroes: any): Hero[] {
    return this.heroDataService.sortByVote(heroes);
  }

  upVoteChecker(heroId: number): void {
    let upvote = this.utilService.getUpvote();
    let downvote = this.utilService.getDownVote();
    let userObj = JSON.parse(<string>localStorage.getItem(this.utilService.currentUser));
    if (downvote.includes(heroId)) {
      this.utilService.removeDownVote(userObj, heroId, downvote);
    }
    if (upvote.includes(heroId)) {
      this.utilService.removeUpVote(userObj, heroId, upvote);
      this.utilService.subtractGlobalVote(heroId);
      this.heroes.find(hero => hero.id === heroId)!.votes--;
    } else {
      this.utilService.addGlobalVote(heroId);
      this.utilService.addUpvote(userObj, heroId);
      this.heroes.find(hero => hero.id === heroId)!.votes++;
    }
    localStorage.setItem(this.utilService.currentUser, JSON.stringify(userObj));
    this.utilService.globalVotes = this.utilService.getGlobalVotes();

  }

  downVoteChecker(heroId: number): void {
    let downvote = this.utilService.getDownVote();
    let upvote = this.utilService.getUpvote();
    let userObj = JSON.parse(<string>localStorage.getItem(this.utilService.currentUser));
    if (upvote.includes(heroId)) {
      this.utilService.removeUpVote(userObj, heroId, upvote);
    }
    if (downvote.includes(heroId)) {
      this.utilService.removeDownVote(userObj, heroId, downvote);
      this.utilService.addGlobalVote(heroId);
      this.heroes.find(hero => hero.id === heroId)!.votes++;
    } else {
      this.utilService.subtractGlobalVote(heroId);
      document.getElementById(heroId + "-unlike")!.style.color = "red";
      userObj.downvote.push(heroId)
      this.heroes.find(hero => hero.id === heroId)!.votes--;
    }
    localStorage.setItem(this.utilService.currentUser, JSON.stringify(userObj));
    this.utilService.globalVotes = this.utilService.getGlobalVotes();

  }

}
